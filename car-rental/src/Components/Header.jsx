import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Way2Go
        </Typography>
        <Button color="inherit" component={NavLink} to="/" end>
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/cars">
          Cars
        </Button>
        <Button color="inherit" component={NavLink} to="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
