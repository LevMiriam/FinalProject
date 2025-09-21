import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice'; // ודא שהנתיב נכון
import { useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Header() {
  const { user } = useSelector(state => state.user || { user: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <AppBar position="fixed" elevation={2} sx={{
      background: 'linear-gradient(120deg, #fafdff 0%, #eaf6fb 100%)',
      boxShadow: '0 2px 12px 0 rgba(33,180,243,0.10)',
      borderBottom: '1.5px solid #222',
    }}>
      <Toolbar sx={{ minHeight: 72 }}>
        {/* Right side: שלום + שם */}
        {user?.name && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              bgcolor: '#e3f6fd',
              px: 2,
              py: 1,
              borderRadius: '30px',
              boxShadow: 1,
              mx: 2,
              minWidth: 120,
              flexGrow: 0,
              order: 2
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#1976d2',
                textAlign: 'right'
              }}
            >
               {user.name} שלום
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexGrow: 1 }}>
          {user && (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                textTransform: 'none',
                color: '#1976d2',
                bgcolor: 'transparent',
                borderRadius: 3,
                mx: 0.5,
                px: 2,
                minWidth: 0,
                '&:hover': {
                  color: '#fff',
                  backgroundColor: '#b3e5fc',
                }
              }}
            >
              יציאה
              <LogoutOutlinedIcon />
            </Button>
          )}
          <Button
            color="inherit"
            component={NavLink}
            to="/about"
            sx={{
              fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'none',
              color: '#1976d2',
              bgcolor: 'transparent',
              borderRadius: 3,
              mx: 0.5,
              px: 2,
              '&:hover': {
                color: '#fff',
                backgroundColor: '#b3e5fc',
              }
            }}
          >
            אודות
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/cars"
            sx={{
              fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'none',
              color: '#1976d2',
              bgcolor: 'transparent',
              borderRadius: 3,
              mx: 0.5,
              px: 2,
              '&:hover': {
                color: '#fff',
                backgroundColor: '#b3e5fc',
              }
            }}
          >
            הרכבים שלנו
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            end
            sx={{
              fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textTransform: 'none',
              color: '#1976d2',
              bgcolor: 'transparent',
              borderRadius: 3,
              mx: 0.5,
              px: 2,
              '&:hover': {
                color: '#fff',
                backgroundColor: '#b3e5fc',
              }
            }}
          >
            דף הבית
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}
