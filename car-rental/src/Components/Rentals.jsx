// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
// import { createRentalOrder, fetchCarsAvailability } from '../Redux/rentalsSlice';

// export default function RentalOrder() {
//     const dispatch = useDispatch();
//     const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '' });
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [availability, setAvailability] = useState([]);

// const cars = useSelector((state) => {
//     console.log(state.rentals); 
//     return state.rentals.carsAvailability;
// });

//     useEffect(() => {
//         dispatch(fetchCarsAvailability());
//     }, [dispatch]);

//     const handleCarSelect = async (carId) => {
//         setSelectedCar(carId);
//         // Fetch availability for the selected car
//         const response = await dispatch(fetchUnavailableDates(carId)).unwrap();
//         setAvailability(response);
//         setOpen(true);
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccess(null);
//         try {
//             const response = await dispatch(createRentalOrder(rentalOrder)).unwrap();
//             setSuccess(response.message);
//             setOpen(false); // Close dialog on success
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Available Cars</Typography>
//             <List>
//                 {cars.map(car => (
//                     <ListItem button key={car.id} onClick={() => handleCarSelect(car.id)}>
//                         <ListItemText primary={car.name} secondary={`Price: ${car.price}`} />
//                     </ListItem>
//                 ))}
//             </List>

//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Order Car Rental</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="h6">Availability for Car ID: {selectedCar}</Typography>
//                     <Typography>Unavailable Dates: {availability.join(', ')}</Typography>
//                     <TextField label="Rental Date" type="date" value={rentalOrder.rentalDate} onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })} fullWidth />
//                     <TextField label="Return Date" type="date" value={rentalOrder.returnDate} onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })} fullWidth />
//                     <TextField label="Customer Email" value={rentalOrder.customerEmail} onChange={(e) => setRentalOrder({ ...rentalOrder, customerEmail: e.target.value })} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//                         {loading ? <CircularProgress size={24} /> : 'Submit'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {error && <Alert severity="error">{error}</Alert>}
//             {success && <Alert severity="success">{success}</Alert>}
//         </Box>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
// import { createRentalOrder, fetchCarsAvailability, fetchUnavailableDates } from '../Redux/rentalsSlice';
// import { getAllCars, addCar, updateCar, deleteCarById ,searchCars} from '../Redux/carsSlice';

// export default function RentalOrder() {
//     const dispatch = useDispatch();
//     const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '' });
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [availability, setAvailability] = useState([]);

//     // const cars = useSelector((state) => state.rentals.carsAvailability(Date.now(),Date.now() + 86400000)); // Example: Fetching cars available today
//     const cars = useSelector((state) => state.cars.cars);

//     useEffect(() => {
//         dispatch(getAllCars());
//     }, [dispatch]);

//     const handleCarSelect = (carId) => {
//         setSelectedCar(carId);
//         setOpen(true);
//     };

//     const handleCheckAvailability = async () => {
//         if (rentalOrder.rentalDate && rentalOrder.returnDate) {
//             const response = await dispatch(fetchUnavailableDates({ carId: selectedCar, rentalDate: rentalOrder.rentalDate, returnDate: rentalOrder.returnDate })).unwrap();
//             setAvailability(response);
//         } else {
//             setError("Please select both rental and return dates.");
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccess(null);
//         try {
//             const response = await dispatch(createRentalOrder(rentalOrder)).unwrap();
//             setSuccess(response.message);
//             setOpen(false); // Close dialog on success
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Available Cars</Typography>
//             <List>
//                 {cars.map(car => (

//                     <ListItem button key={car.id} onClick={() => handleCarSelect(car.id)}>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.make} {car.model}</Typography>
//                                                           <Typography variant="body2">Year: {car.year}</Typography>
//                                                           <Typography variant="body2">License Plate: {car.licensePlate}</Typography>
//                                                           <Typography variant="body2">Available: {car.available ? 'Yes' : 'No'}</Typography>
//                                                           <Typography variant="body2">Seats: {car.numOfSeats}</Typography>
//                                                           <Typography variant="body2">Base Rate: {car.baseRate}</Typography>
//                                                           <Typography variant="body2">Location: {car.location?.city || 'N/A'}, {car.location?.neighborhood || 'N/A'}</Typography>
//                                                           {car.imageBase64 && (
//                                                               <img src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" style={{ width: '100%', height: 180, objectFit: 'cover', margin: '16px 0', borderRadius: 8 }} />
//                                                           )}

//                         {/* <ListItemText primary={car.name} secondary={`Price: ${car.price}`} /> */}
//                     </ListItem>
//                 ))}
//             </List>

//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Order Car Rental</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="h6">Availability for Car ID: {selectedCar}</Typography>
//                     <TextField label="Rental Date" type="date" value={rentalOrder.rentalDate} onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })} fullWidth />
//                     <TextField label="Return Date" type="date" value={rentalOrder.returnDate} onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })} fullWidth />
//                     <Button onClick={handleCheckAvailability} variant="contained">Check Availability</Button>
//                     <Typography>Unavailable Dates: {availability.join(', ')}</Typography>
//                     <TextField label="Customer Email" value={rentalOrder.customerEmail} onChange={(e) => setRentalOrder({ ...rentalOrder, customerEmail: e.target.value })} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//                         {loading ? <CircularProgress size={24} /> : 'Submit'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {error && <Alert severity="error">{error}</Alert>}
//             {success && <Alert severity="success">{success}</Alert>}
//         </Box>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
// import { createRentalOrder, fetchUnavailableDates } from '../Redux/rentalsSlice';
// import { getAllCars } from '../Redux/carsSlice';

// export default function RentalOrder() {
//     const dispatch = useDispatch();
//     const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '' });
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [availability, setAvailability] = useState([]);

//     const cars = useSelector((state) => state.cars.cars);
//     const unavailableDates = useSelector((state) => state.rentals.unavailableDates);

//     useEffect(() => {
//         dispatch(getAllCars());
//     }, [dispatch]);

//     const handleCarSelect = (carId) => {
//         setSelectedCar(carId);
//         setOpen(true);
//     };

//     const handleCheckAvailability = async () => {
//         if (rentalOrder.rentalDate && rentalOrder.returnDate) {
//             const response = await dispatch(fetchUnavailableDates({ carId: selectedCar, rentalDate: rentalOrder.rentalDate, returnDate: rentalOrder.returnDate })).unwrap();
//             setAvailability(response);
//         } else {
//             setError("Please select both rental and return dates.");
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccess(null);
//         try {
//             const response = await dispatch(createRentalOrder(rentalOrder)).unwrap();
//             setSuccess(response.message);
//             setOpen(false); // Close dialog on success
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const isDateUnavailable = (date) => {
//         return unavailableDates.includes(date);
//     };

//     return (
//         <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mb: 4 }}>Available Cars</Typography>
//             <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 {cars.map(car => (
//                     <ListItem button key={car.id} onClick={() => handleCarSelect(car.id)} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
//                         {car.imageBase64 && (
//                             <img src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" style={{ width: '200px', height: 'auto', objectFit: 'cover', marginRight: 16, borderRadius: 8 }} />
//                         )}
//                         <ListItemText
//                             primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.make} {car.model}</Typography>}
//                             secondary={
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                                     <Typography variant="body2">Year: {car.year}</Typography>
//                                     <Typography variant="body2">License Plate: {car.licensePlate}</Typography>
//                                     <Typography variant="body2">Available: {car.available ? 'Yes' : 'No'}</Typography>
//                                     <Typography variant="body2">Seats: {car.numOfSeats}</Typography>
//                                     <Typography variant="body2">Base Rate: {car.baseRate}</Typography>
//                                     <Typography variant="body2">Location: {car.location?.city || 'N/A'}, {car.location?.neighborhood || 'N/A'}</Typography>
//                                 </Box>
//                             }
//                         />
//                     </ListItem>
//                 ))}
//             </List>

//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Order Car Rental</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="h6">Availability for Car ID: {selectedCar}</Typography>
//                     <TextField
//                         label="Rental Date"
//                         type="date"
//                         value={rentalOrder.rentalDate}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         InputProps={{
//                             readOnly: isDateUnavailable(rentalOrder.rentalDate) // Disable if date is unavailable
//                         }}
//                         InputLabelProps={{
//                             style: { color: isDateUnavailable(rentalOrder.rentalDate) ? 'gray' : undefined }
//                         }}
//                     />
//                     <TextField
//                         label="Return Date"
//                         type="date"
//                         value={rentalOrder.returnDate}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         InputProps={{
//                             readOnly: isDateUnavailable(rentalOrder.returnDate) // Disable if date is unavailable
//                         }}
//                         InputLabelProps={{
//                             style: { color: isDateUnavailable(rentalOrder.returnDate) ? 'gray' : undefined }
//                         }}
//                     />
//                     <Button onClick={handleCheckAvailability} variant="contained" sx={{ mb: 2 }}>Check Availability</Button>
//                     <Typography>Unavailable Dates: {availability.join(', ')}</Typography>
//                     <TextField
//                         label="Customer Email"
//                         value={rentalOrder.customerEmail}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, customerEmail: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//                         {loading ? <CircularProgress size={24} /> : 'Submit'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {error && <Alert severity="error">{error}</Alert>}
//             {success && <Alert severity="success">{success}</Alert>}
//         </Box>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
// import { createRentalOrder, fetchUnavailableDates, fetchCarsAvailability } from '../Redux/rentalsSlice';
// import { getAllCars } from '../Redux/carsSlice';

// export default function RentalOrder() {
//     const dispatch = useDispatch();
//     const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '' });
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [selectedCar, setSelectedCar] = useState(null);
//     const [availability, setAvailability] = useState([]);

//     const cars = useSelector((state) => state.cars.cars);
//     const unavailableDates = useSelector((state) => state.rentals.unavailableDates);

//     useEffect(() => {
//         dispatch(getAllCars());
//         dispatch(fetchUnavailableDates()); // טען את התאריכים הלא פעילים כאשר הקומפוננטה נטענת
//     }, [dispatch]);

//     const isDateUnavailable = (date) => {
//         return unavailableDates?.some(unavailable => unavailable.date === date) || false;
//     };

//     const handleCarSelect = (car) => {
//         setSelectedCar(car);
//         setOpen(true);
//         setRentalOrder({ ...rentalOrder, carId: car.id });
//         setAvailability([]); // Reset availability
//     };

//     const handleCheckAvailability = async () => {
//         if (rentalOrder.rentalDate && rentalOrder.returnDate) {
//             const response = await dispatch(fetchUnavailableDates({ year: new Date(rentalOrder.rentalDate).getFullYear(), month: new Date(rentalOrder.rentalDate).getMonth() + 1 })).unwrap();
//             setAvailability(response);
//         } else {
//             setError("Please select both rental and return dates.");
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccess(null);
//         try {
//             const response = await dispatch(createRentalOrder(rentalOrder)).unwrap();
//             setSuccess(response.message);
//             setOpen(false); // Close dialog on success
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mb: 4 }}>Available Cars</Typography>
//             <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 {cars.map(car => (
//                     <ListItem button key={car.id} onClick={() => handleCarSelect(car)} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
//                         {car.imageBase64 && (
//                             <img src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" style={{ width: '200px', height: 'auto', objectFit: 'cover', marginRight: 16, borderRadius: 8 }} />
//                         )}
//                         <ListItemText
//                             primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.make} {car.model}</Typography>}
//                             secondary={
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                                     <Typography variant="body2">Year: {car.year}</Typography>
//                                     <Typography variant="body2">License Plate: {car.licensePlate}</Typography>
//                                     <Typography variant="body2">Available: {car.available ? 'Yes' : 'No'}</Typography>
//                                     <Typography variant="body2">Seats: {car.numOfSeats}</Typography>
//                                     <Typography variant="body2">Base Rate: {car.baseRate}</Typography>
//                                     <Typography variant="body2">Location: {car.location?.city || 'N/A'}, {car.location?.neighborhood || 'N/A'}</Typography>
//                                 </Box>
//                             }
//                         />
//                     </ListItem>
//                 ))}
//             </List>

//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Order Car Rental</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="h6">Availability for {selectedCar?.make} {selectedCar?.model}</Typography>
//                     <TextField
//                         label="Rental Date"
//                         type="date"
//                         value={rentalOrder.rentalDate}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         InputProps={{
//                             readOnly: isDateUnavailable(rentalOrder.rentalDate) // Disable if date is unavailable
//                         }}
//                     />
//                     <TextField
//                         label="Return Date"
//                         type="date"
//                         value={rentalOrder.returnDate}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         InputProps={{
//                             readOnly: isDateUnavailable(rentalOrder.returnDate) // Disable if date is unavailable
//                         }}
//                     />
//                     <Button onClick={handleCheckAvailability} variant="contained" sx={{ mb: 2 }}>Check Availability</Button>
//                     <Typography>Unavailable Dates: {availability.map(date => date.date).join(', ')}</Typography>
//                     <TextField
//                         label="Customer Email"
//                         value={rentalOrder.customerEmail}
//                         onChange={(e) => setRentalOrder({ ...rentalOrder, customerEmail: e.target.value })}
//                         fullWidth
//                         sx={{ mb: 2 }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//                         {loading ? <CircularProgress size={24} /> : 'Submit'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {error && <Alert severity="error">{error}</Alert>}
//             {success && <Alert severity="success">{success}</Alert>}
//         </Box>
//     );
// }
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress, Alert, TextField, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createRentalOrder, fetchUnavailableDates, fetchCarsAvailability, fetchAllLocations } from '../Redux/rentalsSlice';
import { getAllCars } from '../Redux/carsSlice';
import { isSameDay, parseISO } from 'date-fns';

export default function RentalOrder() {
    const dispatch = useDispatch();
    const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '', locationId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [availableCars, setAvailableCars] = useState([]);
    const [locations, setLocations] = useState([]);

    // const unavailableDates = useSelector((state) => state.rentals?.unavailableDates || []);
    const allLocations = useSelector((state) => state.cars?.locations || []);

    useEffect(() => {
        // dispatch(fetchUnavailableDates());
        dispatch(fetchAllLocations()).then(response => {
            setLocations(response.payload);
            console.log('Fetched locations:', response.payload); // הוספת לוג
        });
    }, [dispatch]);
    const isDateUnavailable = (date) => {
        return unavailableDates?.some(unavailable => isSameDay(parseISO(unavailable.date), parseISO(date))) || false;
    };

    const handleSearchCars = async () => {
        if (rentalOrder.location && rentalOrder.rentalDate && rentalOrder.returnDate) {
            setLoading(true);
            setError(null);
            try {
                const response = await dispatch(fetchCarsAvailability({
                    location: rentalOrder.location,
                    start: rentalOrder.rentalDate,
                    end: rentalOrder.returnDate
                })).unwrap();

                // סנן את הרכבים על פי הקריטריונים שלך
                const filteredCars = response.filter(car => car.available ); // או כל קריטריון אחר
                setAvailableCars(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please fill in the location, rental date, and return date.");
        }
    };
    const handleSubmit = async (car) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await dispatch(createRentalOrder({ ...rentalOrder, carId: car.id })).unwrap();
            setSuccess(response.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', mb: 4 }}>Car Rental Search</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Location</InputLabel>
                <Select
                    value={rentalOrder.location || ''}
                    onChange={(e) => setRentalOrder({ ...rentalOrder, location: e.target.value })}
                >

                    {locations.map(location => (
                        <MenuItem key={location.id} value={location.id}>
                            {location.city}, {location.neighborhood}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Rental Date"
                type="date"
                value={rentalOrder.rentalDate}
                onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Return Date"
                type="date"
                value={rentalOrder.returnDate}
                onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button onClick={handleSearchCars} variant="contained" sx={{ mb: 2 }}>Search Cars</Button>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 4 }}>
                {availableCars.map(car => (
                    <ListItem button key={car.id} onClick={() => handleSubmit(car)} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
                        {car.imageBase64 && (
                            <img src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" style={{ width: '200px', height: 'auto', objectFit: 'cover', marginRight: 16, borderRadius: 8 }} />
                        )}
                        <ListItemText
                            primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.make} {car.model}</Typography>}
                            secondary={
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2">Year: {car.year}</Typography>
                                    <Typography variant="body2">License Plate: {car.licensePlate}</Typography>
                                    <Typography variant="body2">Available: {car.available ? 'Yes' : 'No'}</Typography>
                                    <Typography variant="body2">Seats: {car.numOfSeats}</Typography>
                                    <Typography variant="body2">Base Rate: {car.baseRate}</Typography>
                                    <Typography variant="body2">Location: {car.location?.city}, {car.location?.neighborhood}</Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
