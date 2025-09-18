import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, CircularProgress, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { keyframes } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import jwtDecode from 'jwt-decode';
// import * as jwtDecode from 'jwt-decode';


const flashGreen = keyframes`
  0% { border-color: transparent; }
  50% { border-color: green; }
  100% { border-color: transparent; }
`;
const flashRed = keyframes`
  0% { border-color: transparent; }
  50% { border-color: red; }
  100% { border-color: transparent; }
`;
import { getAllCars, addCar, updateCar, deleteCarById, searchCars } from '../Redux/carsSlice';

export default function CarsList({ setCarAdded }) {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.cars.cars);
    const status = useSelector((state) => state.cars.status);
    const error = useSelector((state) => state.cars.error);
    const [open, setOpen] = useState(false);
    const [newCar, setNewCar] = useState({ id: 0, make: '', model: '', year: '', licensePlate: '', available: false, numOfSeats: 0, baseRate: '', location: { city: '', neighborhood: '' }, imageBase64: null, image: null });
    const [addError, setAddError] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [editCar, setEditCar] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [filters, setFilters] = useState({ city: '', neighborhood: '', seats: '', model: '' });
    const [openSearch, setOpenSearch] = useState(false);
    const token = useSelector((state) => state.user.token); 
    let userRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);

            userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            console.log('Decoded Token:', decodedToken);
            console.log('userRole:', userRole);

        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    useEffect(() => {
        if (status === 'idle') {
            setShowLoading(true);
            dispatch(getAllCars());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (error && status !== 'failed') {
            setAddError(error);
            setAddSuccess(false);
        }
    }, [error, status]);

    useEffect(() => {
        if (addError) {
            const timer = setTimeout(() => setAddError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [addError]);

    useEffect(() => {
        if (addSuccess) {
            const timer = setTimeout(() => setAddSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [addSuccess]);

    useEffect(() => {
        if (status === 'loading') {
            setShowLoading(true);
            const timer = setTimeout(() => setShowLoading(false), 3000);
            return () => clearTimeout(timer);
        } else if (status === 'succeeded' || status === 'failed') {
            setShowLoading(false);
        }
    }, [status]);

    const handleDelete = async (car) => {
        console.log("Attempting to delete car with ID:", car.id);
        if (car.id) {
            try {
                await dispatch(deleteCarById(car.id)).unwrap();

            } catch (error) {
                console.error("Error deleting car:", error);
            }
        } else {
            console.error("Car ID is null or undefined");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCar({ ...newCar, imageBase64: reader.result, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditCar = (car) => {
        setEditCar(car);
        setOpenEdit(true);
    };

    const handleUpdateCar = async () => {
        if (editCar && editCar.id) {
            const carId = Number(editCar.id);
            const formData = new FormData();
            formData.append('Id', carId);
            formData.append('Make', editCar.make);
            formData.append('Model', editCar.model);
            formData.append('Year', editCar.year);
            formData.append('LicensePlate', editCar.licensePlate);
            formData.append('Available', editCar.available);
            formData.append('NumOfSeats', editCar.numOfSeats);
            formData.append('BaseRate', parseFloat(editCar.baseRate) || 0); // המרה לדצימל

            if (editCar.location) {
                formData.append('Location.Id', editCar.location.id || '');
                formData.append('Location.City', editCar.location.city || '');
                formData.append('Location.Neighborhood', editCar.location.neighborhood || '');
            }

            formData.append('ImageBase64', newCar.imageBase64);
            if (newCar.image) {
                formData.append('Image', newCar.image);
            }

            try {
                const response = await dispatch(updateCar({ id: carId, carForm: formData })).unwrap();
                console.log('Car updated successfully:', response);
                setOpenEdit(false);
                dispatch(getAllCars());
            } catch (error) {
                if (error.response) {
                    console.error('Error updating car:', error.response.data);
                    console.error('Status code:', error.response.status);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error', error.message);
                }
            }
        }
    };

    const handleSearch = async () => {
        setShowLoading(true);
        try {
            const response = await dispatch(searchCars(filters)).unwrap();
            console.log('Search results:', response);
        } catch (err) {
            console.error('Error fetching cars:', err);
        } finally {
            setOpenSearch(false);
            setShowLoading(false);
        }
    };


    return (
        <Box
            sx={{
                bgcolor: 'rgba(245, 245, 245, 1)',
                minHeight: '100%',
                py: 6,
                px: 2,
                width: '126%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {addError && (
                <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
                    {addError}
                </Alert>
            )}
            {addSuccess && (
                <Alert severity="success" sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
                    !הרכב נוסף בהצלחה
                </Alert>
            )}
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mr: 2 }}>Our Cars</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 2 }}>
                {userRole === 'Admin' && (
                    <>
                        <Button variant="contained" onClick={() => setOpen(true)} sx={{ textTransform: 'none', backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' }, mr: 1 }}>
                            + Add Car
                        </Button>
                    </>

                )
                }

                <Button variant="contained" onClick={() => setOpenSearch(true)} sx={{ textTransform: 'none', backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}>
                    <SearchIcon />
                </Button>
            </Box>

            <Box
                sx={{
                    maxWidth: 1000,
                    mx: 'auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4,
                    px: 2
                }}
            >
            </Box>

            {showLoading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                    <CircularProgress size={60} thickness={5} sx={{ color: '#1976d2' }} />
                    <Typography sx={{ mt: 2, color: '#1976d2' }}>Loading...</Typography>
                </Box>
            )}

            {status === 'failed' && (
                <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                    Error: {error}
                </Alert>
            )}

            {status === 'succeeded' && (
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, display: 'flex', justifyContent: 'center' }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        {cars.length > 0 && cars.map((car, id) => (
                            <Grid item xs={12} sm={6} md={4} key={car.id || `car-${id}`}>
                                <Card
                                    sx={{
                                        width: 320,
                                        backgroundColor: 'white',
                                        borderRadius: 3,
                                        boxShadow: 4,
                                        border: `2px solid ${car.available ? 'green' : 'red'}`,
                                        animation: `${car.available ? flashGreen : flashRed} 1s infinite`,
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.make} {car.model}</Typography>
                                        <Typography variant="body2">Year: {car.year}</Typography>
                                        <Typography variant="body2">License Plate: {car.licensePlate}</Typography>
                                        <Typography variant="body2">Available: {car.available ? 'Yes' : 'No'}</Typography>
                                        <Typography variant="body2">Seats: {car.numOfSeats}</Typography>
                                        <Typography variant="body2">Base Rate: {car.baseRate}</Typography>
                                        <Typography variant="body2">Location: {car.location?.city || 'N/A'}, {car.location?.neighborhood || 'N/A'}</Typography>
                                        {car.imageBase64 && (
                                            <img src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" style={{ width: '100%', height: 180, objectFit: 'cover', margin: '16px 0', borderRadius: 8 }} />
                                        )}
                                        {userRole === 'Admin' && (
                                            <>
                                                <EditIcon
                                                    sx={{
                                                        color: '#000000ff',
                                                        '&:hover': { color: '#494848ff' },
                                                        marginRight: '18px'
                                                    }}
                                                    onClick={() => handleEditCar(car)}
                                                />
                                                <DeleteIcon
                                                    onClick={() => handleDelete(car)}
                                                    sx={{
                                                        color: '#000000ff',
                                                        '&:hover': { color: '#424242ff' }
                                                    }}
                                                />
                                            </>
                                        )}



                                    </CardContent>
                                </Card>


                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            <Dialog open={openSearch} onClose={() => setOpenSearch(false)}>
                <DialogTitle>Search Car</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="City" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
                    <TextField label="Neighborhood" value={filters.neighborhood} onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value })} />
                    <TextField label="Seats" type="number" value={filters.seats} onChange={(e) => setFilters({ ...filters, seats: e.target.value })} />
                    <TextField label="Model" value={filters.model} onChange={(e) => setFilters({ ...filters, model: e.target.value })} />
                    <Button onClick={handleSearch}>Search</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField sx={{ marginTop: 3 }} label="Id" variant="outlined" value={newCar.id || ''} onChange={(e) => setNewCar({ ...newCar, id: e.target.value })} />
                    <TextField label="Make" variant="outlined" value={newCar.make || ''} onChange={(e) => setNewCar({ ...newCar, make: e.target.value })} />
                    <TextField label="Model" variant="outlined" value={newCar.model || ''} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} />
                    <TextField label="Year" variant="outlined" value={newCar.year || ''} onChange={(e) => setNewCar({ ...newCar, year: e.target.value })} />
                    <TextField label="License Plate" variant="outlined" value={newCar.licensePlate || ''} onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })} />
                    <TextField label="Available" variant="outlined" type="checkbox" checked={newCar.available || false} onChange={(e) => setNewCar({ ...newCar, available: e.target.checked })} />
                    <TextField label="Number of Seats" variant="outlined" value={newCar.numOfSeats || ''} onChange={(e) => setNewCar({ ...newCar, numOfSeats: parseInt(e.target.value) })} />
                    <TextField label="Base Rate" variant="outlined" value={newCar.baseRate || ''} onChange={(e) => setNewCar({ ...newCar, baseRate: parseFloat(e.target.value) })} />
                    <TextField label="Location id" variant="outlined" value={newCar.location.id || ''} onChange={(e) => setNewCar({ ...newCar, location: { ...newCar.location, id: e.target.value } })} />
                    <TextField label="City" variant="outlined" value={newCar.location.city || ''} onChange={(e) => setNewCar({ ...newCar, location: { ...newCar.location, city: e.target.value } })} />
                    <TextField label="Neighborhood" variant="outlined" value={newCar.location.neighborhood || ''} onChange={(e) => setNewCar({ ...newCar, location: { ...newCar.location, neighborhood: e.target.value } })} />
                    <input type="file" onChange={handleImageChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            const formData = new FormData();
                            formData.append('Id', newCar.id ? Number(newCar.id) : undefined);
                            formData.append('Make', newCar.make);
                            formData.append('Model', newCar.model);
                            formData.append('Year', newCar.year);
                            formData.append('LicensePlate', newCar.licensePlate);
                            formData.append('Available', newCar.available);
                            formData.append('NumOfSeats', newCar.numOfSeats);
                            formData.append('BaseRate', parseFloat(newCar.baseRate) || 0); // המרה לדצימל
                            formData.append('Location.Id', newCar.location.id);
                            formData.append('Location.City', newCar.location.city);
                            formData.append('Location.Neighborhood', newCar.location.neighborhood);
                            formData.append('ImageBase64', newCar.imageBase64);
                            if (newCar.image) {
                                formData.append('Image', newCar.image);
                            }

                            dispatch(addCar(formData))
                                .unwrap()
                                .then(() => {
                                    setAddSuccess(true);
                                    setAddError(null);
                                    dispatch(getAllCars());
                                    if (setCarAdded) setCarAdded(true);
                                })
                                .catch(() => {
                                    setAddError('הוספת הרכב נכשלה');
                                    setAddSuccess(false);
                                })
                                .finally(() => {
                                    setOpen(false);
                                    setNewCar({
                                        id: 0,
                                        make: '',
                                        model: '',
                                        year: '',
                                        licensePlate: '',
                                        available: false,
                                        numOfSeats: 0,
                                        baseRate: 0,
                                        location: { city: '', neighborhood: '' },
                                        imageBase64: null,
                                        image: null
                                    });
                                });
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {editCar?.imageUrl && (
                        <img src={editCar.imageUrl} alt="Current Car" style={{ width: '100%', height: 'auto' }} />
                    )}
                    <TextField
                        sx={{ marginTop: 3 }}
                        label="Id"
                        variant="outlined"
                        value={editCar?.id || ''}
                        onChange={(e) => setEditCar({ ...editCar, id: e.target.value })}
                    />
                    <TextField
                        label="Make"
                        value={editCar?.make || ''}
                        onChange={(e) => setEditCar({ ...editCar, make: e.target.value })}
                    />
                    <TextField label="Model" value={editCar?.model || ''} onChange={(e) => setEditCar({ ...editCar, model: e.target.value })} />
                    <TextField
                        label="Year"
                        value={editCar?.year || ''}
                        onChange={(e) => setEditCar({ ...editCar, year: e.target.value })}
                    />
                    <TextField
                        label="License Plate"
                        value={editCar?.licensePlate || ''}
                        onChange={(e) => setEditCar({ ...editCar, licensePlate: e.target.value })}
                    />
                    <TextField
                        label="Available"
                        type="checkbox"
                        checked={editCar?.available || false}
                        onChange={(e) => setEditCar({ ...editCar, available: e.target.checked })}
                    />
                    <TextField
                        label="Number of Seats"
                        value={editCar?.numOfSeats || ''}
                        onChange={(e) => setEditCar({ ...editCar, numOfSeats: parseInt(e.target.value) })}
                    />
                    <TextField
                        label="Base Rate"
                        value={editCar?.baseRate || ''}
                        onChange={(e) => setEditCar({ ...editCar, baseRate: parseFloat(e.target.value) })}
                    />

                    <TextField
                        label="Location Id"
                        value={editCar?.location?.id || ''}
                        onChange={(e) => setEditCar({ ...editCar, location: { ...editCar.location, id: e.target.value } })}
                    />
                    <TextField
                        label="City"
                        value={editCar?.location?.city || ''}
                        onChange={(e) => setEditCar({ ...editCar, location: { ...editCar.location, city: e.target.value } })}
                    />
                    <TextField
                        label="Neighborhood"
                        value={editCar?.location?.neighborhood || ''}
                        onChange={(e) => setEditCar({ ...editCar, location: { ...editCar.location, neighborhood: e.target.value } })}
                    />
                    <input type="file" onChange={handleImageChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleUpdateCar}>Update</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}
