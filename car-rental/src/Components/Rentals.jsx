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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
import { createRentalOrder, fetchCarsAvailability, fetchUnavailableDates } from '../Redux/rentalsSlice';
import { getAllCars, addCar, updateCar, deleteCarById ,searchCars} from '../Redux/carsSlice';

export default function RentalOrder() {
    const dispatch = useDispatch();
    const [rentalOrder, setRentalOrder] = useState({ carId: '', rentalDate: '', returnDate: '', customerEmail: '' });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [availability, setAvailability] = useState([]);

    const cars = useSelector((state) => state.rentals.carsAvailability(Date.now(),Date.now() + 86400000)); // Example: Fetching cars available today
    // const cars = useSelector((state) => state.cars.cars);
    
    useEffect(() => {
        dispatch(fetchCarsAvailability());
    }, [dispatch]);

    const handleCarSelect = (carId) => {
        setSelectedCar(carId);
        setOpen(true);
    };

    const handleCheckAvailability = async () => {
        if (rentalOrder.rentalDate && rentalOrder.returnDate) {
            const response = await dispatch(fetchUnavailableDates({ carId: selectedCar, rentalDate: rentalOrder.rentalDate, returnDate: rentalOrder.returnDate })).unwrap();
            setAvailability(response);
        } else {
            setError("Please select both rental and return dates.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await dispatch(createRentalOrder(rentalOrder)).unwrap();
            setSuccess(response.message);
            setOpen(false); // Close dialog on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6, px: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Available Cars</Typography>
            <List>
                {cars.map(car => (
                    <ListItem button key={car.id} onClick={() => handleCarSelect(car.id)}>
                        <ListItemText primary={car.name} secondary={`Price: ${car.price}`} />
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Order Car Rental</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Availability for Car ID: {selectedCar}</Typography>
                    <TextField label="Rental Date" type="date" value={rentalOrder.rentalDate} onChange={(e) => setRentalOrder({ ...rentalOrder, rentalDate: e.target.value })} fullWidth />
                    <TextField label="Return Date" type="date" value={rentalOrder.returnDate} onChange={(e) => setRentalOrder({ ...rentalOrder, returnDate: e.target.value })} fullWidth />
                    <Button onClick={handleCheckAvailability} variant="contained">Check Availability</Button>
                    <Typography>Unavailable Dates: {availability.join(', ')}</Typography>
                    <TextField label="Customer Email" value={rentalOrder.customerEmail} onChange={(e) => setRentalOrder({ ...rentalOrder, customerEmail: e.target.value })} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
        </Box>
    );
}
