// src/Components/Login.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login({ onLogin, error }) {
  const [id, setId] = useState('');

  return (
    <Box
  sx={{
    width: '100vw',
    height: '100vh',
    bgcolor: '#fff', // רקע לבן
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Paper
    elevation={6}
    sx={{
      p: 5,
      borderRadius: 4,
      width: '100%',
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      direction: 'rtl', // לשפה עברית
    }}
  >
    <Avatar sx={{ bgcolor: '#b71c1c', mb: 2 }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography
      variant="h5"
      sx={{
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        fontWeight: 700,
        color: '#b71c1c',
        mb: 2,
        textAlign: 'center',
      }}
    >
      כניסה למערכת Way2Go
    </Typography>
    {error && (
      <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
        {error}
      </Alert>
    )}
    <TextField
      label="מספר מזהה"
      type="number"
      variant="outlined"
      fullWidth
      sx={{ mb: 3 }}
      value={id}
      onChange={(e) => setId(e.target.value)}
    />
    <Button
      variant="contained"
      fullWidth
      sx={{ bgcolor: '#b71c1c', '&:hover': { bgcolor: '#9f1818' } }}
      onClick={() => {
        const numId = Number(id);
        if (!numId || isNaN(numId)) return;
        onLogin(numId);
      }}
    >
      התחבר
    </Button>
  </Paper>
</Box>

  );
}
