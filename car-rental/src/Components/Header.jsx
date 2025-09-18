import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import logo from '../assets/cars/logo2.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice.js'; // ודא שהנתיב נכון
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';



export default function Header() {
  const { user } = useSelector(state => state.user || { user: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());               // מנקה את המשתמש והטוקן מה-Redux
    localStorage.removeItem('token'); // מנקה מהזיכרון המקומי
    navigate('/login');               // מפנה למסך התחברות (או כל דף שתבחרי)
  };

   const token = useSelector((state) => state.user.token); // הנחה שהטוקן נמצא ב-state של Redux
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

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Box
          component={NavLink}
          to="/"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Way2Go Logo"
            sx={{
              height: 60
            }}
          />
        </Box>
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          end
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            textTransform: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'red',
              backgroundColor: 'transparent'
            }
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/cars"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            textTransform: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'red',
              backgroundColor: 'transparent'
            }
          }}
        >
          Cars
        </Button>
        {userRole === 'Admin' && (
          <Button
            color="inherit"
            component={NavLink}
            to="/clients"
            sx={{
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'none',
              color: 'inherit',
              '&:hover': {
                color: 'red',
                backgroundColor: 'transparent'
              }
            }}
          >
            Clients
          </Button>
        )}
        <Button
          color="inherit"
          component={NavLink}
          to="/about"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            textTransform: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'red',
              backgroundColor: 'transparent'
            }
          }}
        >
          About
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/rentals"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            textTransform: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'red',
              backgroundColor: 'transparent'
            }
          }}
        >
          Rentals
        </Button>
        {user && (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'none',
              color: 'inherit',
              '&:hover': {
                color: 'red',
                backgroundColor: 'transparent'
              }
            }}
          >
            Logout
          </Button>
        )}

        {user?.name && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'white', // רקע לבן
              px: 2,
              py: 1,
              borderRadius: '30px',
              boxShadow: 1,
              mx: 2
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#b71c1c'
              }}
            >
              Hello {user.name} 
            </Typography>
          </Box>
        )}


      </Toolbar>
    </AppBar>
  );
}
