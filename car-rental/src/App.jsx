import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Cars from './Components/Cars';
import ClientsList from './Components/Clients';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Components/Login';
import { loginUser } from './Redux/userSlice';
import Footer from './Components/Footer';

const theme = createTheme();

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(false);
  const [clientAdded, setClientAdded] = useState(false);

  const { token, user, error } = useSelector(state => state.user);

  const handleLogin = (id) => {
    dispatch(loginUser(id));
  };

  // שמירת טוקן ב-localStorage כאשר מתחברים
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  // אם יש טוקן ב-localStorage, אפשר להשתמש בו ישירות
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      // אפשר לקרוא כאן לאקשן שמשחזר את המשתמש מתוך הטוקן
      console.log('Using token from localStorage:', savedToken);
    }
  }, [token]);

  // ניווט לדף הבית אחרי התחברות
  useEffect(() => {
    if (token && location.pathname === '/login') {
      navigate('/');
    }
  }, [token, location.pathname, navigate]);

  // טעינת מסך זמנית
  useEffect(() => {
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

  // תוכן מותאם לסטטוס ההתחברות
  const isLoggedIn = Boolean(token);
  const content = isLoggedIn ? (
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
        <>
          <Container sx={{ mt: 10, mb: 12 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/clients" element={<ClientsList setClientAdded={setClientAdded} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
          <Footer />
        </>
      )}
    </>
  ) : (
    <Login onLogin={handleLogin} error={error} />
  );

  return content;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
