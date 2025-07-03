// import React, { useEffect, useState } from 'react';
// import { getAllCars, getCarsByCity } from '../Api'; // ודא שהנתיב נכון
// import { Card, CardContent, Typography, Grid, Container, TextField } from '@mui/material';

// const CarList = () => {
//     const [cars, setCars] = useState([]);
//     const [searchLocation, setSearchLocation] = useState('');

//     useEffect(() => {
//         const fetchCars = async () => {
//             try {
//                 const data = await getAllCars();
//                 setCars(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//             }
//         };

//         fetchCars();
//     }, []);

//     const handleSearch = async () => {
//     const city = searchLocation.trim();
//     if (!city) {
//         const data = await getAllCars();
//         setCars(data);
//         return;
//     }
//     try {
//         const data = await getCarsByCity(city);
//         setCars(data);
//     } catch (error) {
//         console.error('Error fetching cars by city:', error.message);
//     }
// };

//     return (
//         <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Typography variant="h4" gutterBottom align="center">
//                 Car List
//             </Typography>
//             <TextField
//                 label="Search by City"
//                 variant="outlined"
//                 value={searchLocation}
//                 onChange={(e) => setSearchLocation(e.target.value)}
//                 onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                         handleSearch();
//                     }
//                 }}
//                 style={{ marginBottom: '20px', width: '300px' }}
//             />
//             <Grid container spacing={3} justifyContent="center">
//                 {cars.map(car => (
//                     <Grid item xs={12} sm={6} md={4} key={car.id}>
//                         <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
//                             <CardContent>
//                                 <Typography variant="h5" component="div" align="center">
//                                     {car.model}
//                                 </Typography>
//                                 <Typography color="text.secondary" align="center">
//                                     Year: {car.year}
//                                 </Typography>
//                                 <Typography color="text.secondary" align="center">
//                                     Price: ${car.baseRate}
//                                 </Typography>
//                                 <Typography color="text.secondary" align="center">
//                                     Number of Seats: {car.numOfSeats}
//                                 </Typography>
//                                 <Typography color="text.secondary" align="center">
//                                     Location: {car.location.city}, {car.location.neighborhood}
//                                 </Typography>
//                                 <img
//                                     src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car" 
//                                     style={{ width: '100%', height: 180, objectFit: 'cover', margin: '16px 0', borderRadius: 8 }}
//                                 />
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default CarList;
import React, { useEffect, useState } from 'react';
import { getAllCars, getCarsByCity } from '../Api';
import { Card, CardContent, Typography, Grid, Container, TextField, Button } from '@mui/material';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const data = await getAllCars();
            setCars(data);
            setNotFound(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handleSearch = async () => {
        const city = searchLocation.trim().toLowerCase();
        if (!city) {
            fetchAll();
            return;
        }
        try {
            const data = await getCarsByCity(city);
            setCars(data);
            setNotFound(data.length === 0);
        } catch (error) {
            console.error('Error fetching cars by city:', error.message);
            setNotFound(true);
        }
    };

    return (
        <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
                Car List
            </Typography>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <TextField
                    label="Search by City"
                    variant="outlined"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    style={{ width: '300px' }}
                />
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </div>
            {notFound && (
                <Typography color="error" align="center">
                    לא נמצאו רכבים בעיר שחיפשת
                </Typography>
            )}
            <Grid container spacing={3} justifyContent="center">
                {cars.map(car => (
                    <Grid item xs={12} sm={6} md={4} key={car.id}>
                        <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" align="center">
                                    {car.model}
                                </Typography>
                                <Typography color="text.secondary" align="center">
                                    Year: {car.year}
                                </Typography>
                                <Typography color="text.secondary" align="center">
                                    Price: ${car.baseRate}
                                </Typography>
                                <Typography color="text.secondary" align="center">
                                    Number of Seats: {car.numOfSeats}
                                </Typography>
                                <Typography color="text.secondary" align="center">
                                    Location: {car.location.city}, {car.location.neighborhood}
                                </Typography>
                                <img
                                    src={`data:image/jpeg;base64,${car.imageBase64}`} alt="car"
                                    style={{ width: '100%', height: 180, objectFit: 'cover', margin: '16px 0', borderRadius: 8 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CarList;