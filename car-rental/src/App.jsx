import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Cars from './Components/CarsList';
import Container from '@mui/material/Container';
import ClientsList from './Components/Clients';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme();

function AppContent() {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const [clientAdded, setClientAdded] = useState(false);

  useEffect(() => {
    // אם זו טעינה בגלל מעבר עמוד (ולא הוספת לקוח)
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (clientAdded) {
      setShowLoading(false);
      setClientAdded(false);
    }
  }, [clientAdded]);

  return (
    <>
      <Header />
      {showLoading ? (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 2000
        }}>
          <CircularProgress size={70} thickness={5} sx={{ color: '#000' }} />
          <Typography sx={{ mt: 2, fontFamily: 'Comic Sans MS, cursive, sans-serif', color: '#000' }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Container sx={{ mt: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/clients" element={<ClientsList setClientAdded={setClientAdded} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
