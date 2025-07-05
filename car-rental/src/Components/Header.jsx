import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import logo from '../assets/cars/logo2.png';

export default function Header() {
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
      </Toolbar>
    </AppBar>
  );
}
