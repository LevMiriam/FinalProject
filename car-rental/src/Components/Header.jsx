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
import { logout } from '../Redux/userSlice'; // ודא שהנתיב נכון
import { useNavigate } from 'react-router-dom';




export default function Header() {
  const { user } = useSelector(state => state.user || { user: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());               // מנקה את המשתמש והטוקן מה-Redux
    localStorage.removeItem('token'); // מנקה מהזיכרון המקומי
    navigate('/login');               // מפנה למסך התחברות (או כל דף שתבחרי)
  };
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
        {user?.role === 'Admin' && (
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
