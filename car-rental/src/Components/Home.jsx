import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import car1 from '../assets/cars/car1.jpg';
import car2 from '../assets/cars/car2.png';
import car3 from '../assets/cars/car3.jpg';
import car4 from '../assets/cars/car4.jpg';
import car5 from '../assets/cars/car5.jpg';
import { useNavigate } from 'react-router-dom';


const carImages = [
    { label: 'Luxury Car', imgPath: car1, description: 'Experience ultimate comfort and style.' },
    { label: 'Sport Car', imgPath: car2, description: 'Drive with power and precision.' },
    { label: 'SUV Car', imgPath: car3, description: 'Perfect for family adventures.' },
    { label: 'Convertible', imgPath: car4, description: 'Feel the wind in your hair.' },
    { label: 'Executive Sedan', imgPath: car5, description: 'Travel in luxury for business or pleasure.' },
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();


    // Auto-play with pause on hover
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 3000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPaused]);

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % carImages.length);
            setFade(true);
        }, 300);
    };

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
            setIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
            setFade(true);
        }, 300);
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'black',
            }}
        >
            {/* IMAGE */}
            <Box
                component="img"
                src={carImages[index].imgPath}
                alt={carImages[index].label}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.5s ease',
                    opacity: fade ? 1 : 0,
                }}
            />

            {/* OVERLAY GRADIENT */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}
            />

            {/* TEXT CONTENT */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    textAlign: 'center',
                    px: 2,
                    zIndex: 2,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', sm: '3rem' } }}
                >
                    {carImages[index].label}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, maxWidth: 600 }}>
                    {carImages[index].description}
                </Typography>
                <Button       onClick={() => navigate('/cars')} variant="contained" sx={{ backgroundColor: 'white', color: 'black', textTransform: 'none', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                    To our cars
                </Button>
            </Box>

            {/* CONTROLS */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 20,
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                }}
            >
                <IconButton
                    onClick={handlePrev}
                    sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.4)' }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 20,
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                }}
            >
                <IconButton
                    onClick={handleNext}
                    sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.4)' }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* DOTS */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 2,
                }}
            >
                {carImages.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setIndex(i)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: i === index ? 'white' : 'gray',
                            mx: 0.5,
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}