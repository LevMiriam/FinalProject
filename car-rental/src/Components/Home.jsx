import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import car1 from '../assets/cars/car1.jpg';
import car2 from '../assets/cars/car2.png';
import car3 from '../assets/cars/car3.jpg';
import car4 from '../assets/cars/car4.jpg';
import car6 from '../assets/cars/car6.webp';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const carImages = [
  { label: 'Luxury Car', imgPath: car1, description: 'Experience ultimate comfort and style.' },
  { label: 'Sport Car', imgPath: car2, description: 'Drive with power and precision.' },
  { label: 'SUV Car', imgPath: car3, description: 'Perfect for family adventures.' },
  { label: 'Convertible', imgPath: car4, description: 'Feel the wind in your hair.' },
  { label: 'Executive Sedan', imgPath: car6, description: 'Travel in luxury for business or pleasure.' },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

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
      sx={{
        maxWidth: '100vw',
        minHeight: '100vh',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflowX: 'hidden',
        bgcolor: 'linear-gradient(120deg, #fafdff 0%, #eaf6fb 100%)',
        py: { xs: 4, md: 8 },
      }}
    >
      {/* TOP SECTION: WELCOME + BUTTONS */}
      <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2.2rem', sm: '2.8rem' },
            fontFamily: 'Satisfy, Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
            color: '#1976d2',
            mb: 2,
            textShadow: '0 2px 8px #e3f2fd',
          }}
        >
          Welcome to Way2Go!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#1976d2',
            fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
            mb: 3,
          }}
        >
          האתר שלכם להשכרת רכבים בקלות ובמהירות
        </Typography>
        <Button
          onClick={() => navigate('/new-reservation')}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            color: '#1976d2',
            borderColor: '#1976d2',
            fontWeight: 700,
            fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            boxShadow: 1,
            mx: 1,
            mb: 2,
            textTransform: 'none',
            letterSpacing: 1,
            '&:hover': {
              background: '#e3f6fd',
              borderColor: '#1976d2',
            },
          }}
        >
          יצירת הזמנה חדשה
        </Button>
        <Button
          onClick={() => navigate('/profile')}
          variant="outlined"
          startIcon={<PersonIcon />}
          sx={{
            color: '#1976d2',
            borderColor: '#1976d2',
            fontWeight: 700,
            fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            boxShadow: 1,
            mx: 1,
            mb: 2,
            textTransform: 'none',
            letterSpacing: 1,
            '&:hover': {
              background: '#e3f6fd',
              borderColor: '#1976d2',
            },
          }}
        >
          לאזור האישי שלי
        </Button>
      </Box>

      {/* MOSAIC/COLLAGE SECTION: DYNAMIC CAR IMAGES */}
      <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', mt: 8, mb: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <Box component="img" src={carImages[0].imgPath} alt={carImages[0].label} sx={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 8, boxShadow: 2, opacity: 0.7 }} />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Box component="img" src={carImages[1].imgPath} alt={carImages[1].label} sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, boxShadow: 1, opacity: 0.7 }} />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Box component="img" src={carImages[2].imgPath} alt={carImages[2].label} sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, boxShadow: 2, opacity: 0.7 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box component="img" src={carImages[3].imgPath} alt={carImages[3].label} sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 24, boxShadow: 3, opacity: 0.7 }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box component="img" src={carImages[4].imgPath} alt={carImages[4].label} sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, boxShadow: 2, opacity: 0.7 }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
