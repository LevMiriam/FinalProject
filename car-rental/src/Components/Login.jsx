// src/Components/Login.jsx
import React, { useState, useEffect } from 'react';
import Register from './Register';
import { Box, Typography, TextField, Button, Paper, Avatar, Alert, Fade, Divider } from '@mui/material';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import GoogleIconImg from '../assets/google/icon.png';

export default function Login({ onLogin, error }) {
  const [id, setId] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          bgcolor: 'linear-gradient(120deg, #fafdff 0%, #eaf6fb 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 5,
            maxWidth: 400,
            width: '100%',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 8px 32px 0 rgba(33,180,243,0.07)',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#fafdff',
          }}
        >
          {!showRegister && (
            <>
              <Avatar sx={{ bgcolor: '#fff', mb: 2, width: 56, height: 56, border: '2px solid #b3e5fc' }}>
                <VpnKeyRoundedIcon fontSize="large" sx={{ color: '#0288d1' }} />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif',
                  fontWeight: 700,
                  color: '#222',
                  mb: 2,
                  textAlign: 'center',
                  letterSpacing: 1,
                  fontSize: '2.3rem',
                  textShadow: '0 2px 8px #e3f2fd',
                  display: showRegister ? 'none' : 'block',
                }}
              >
                LogIn
              </Typography>
              <Divider sx={{ width: 80, mb: 3, borderBottomWidth: 2, borderColor: '#b3e5fc' }} />
            </>
          )}
          {showRegister ? (
            <Register onBack={() => setShowRegister(false)} />
          ) : (
            <>
              {error && showError && (
                <Alert severity="error" sx={{ mb: 2, width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  משתמש לא מזוהה
                </Alert>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="תעודת זהות"
                  type="text"
                  variant="standard"
                  sx={{ mb: 3, background: '#fff', borderRadius: 2, maxWidth: 320, mx: 'auto', '& input': { textAlign: 'center' }, '& label': { left: '50%', transform: 'translateX(-50%)' }, '& legend': { textAlign: 'center', width: '100%' } }}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  InputProps={{
                    sx: { fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 500, textAlign: 'center' },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif',
                  fontWeight: 700,
                  py: 1.2,
                  fontSize: '1.1rem',
                  letterSpacing: 1,
                  borderRadius: 3,
                  boxShadow: 2,
                  mt: 1,
                  transition: 'all 0.2s',
                  bgcolor: '#e3f6fd',
                  color: '#1976d2',
                  '&:hover': { backgroundColor: '#b6e4fa' },
                }}
                onClick={() => {
                  const numId = Number(id);
                  if (!numId || isNaN(numId)) return;
                  onLogin(numId);
                }}
              >
                כניסה
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.1,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif',
                  color: '#222',
                  background: '#fff',
                  borderColor: '#b3e5fc',
                  boxShadow: 1,
                  textTransform: 'none',
                  '&:hover': {
                    background: '#f1faff',
                    borderColor: '#90caf9',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                }}
                startIcon={
                  <img src={GoogleIconImg} alt="Google icon" style={{ width: 26, height: 26, marginRight: 8, borderRadius: '50%', background: '#fff' }} />
                }
                // TODO: Add your Google login handler here
                onClick={() => alert('Google login coming soon!')}
              >
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: 'inherit', display: 'inline-block', verticalAlign: 'middle' }}>Google</span><span style={{ display: 'inline-block', verticalAlign: 'middle', position: 'relative', top: '3px' }}>המשך עם</span>
              </Button>
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  color: '#0288d1',
                  fontFamily: 'Comic Sans MS, cursive, sans-serif',
                }}
              >

                {!showRegister && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 700, color: '#0288d1', fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif', cursor: 'pointer' }} onClick={() => setShowRegister(true)}>
                    <PersonAddAlt1Icon sx={{ fontSize: 22, color: '#0288d1', ml: 0.5, mr: 0.5 }} />
                    <span style={{ textDecoration: 'underline', marginRight: 2, color: '#0288d1' }}>הירשם כאן</span>
                    <span style={{ marginLeft: 4, color: '#0288d1', fontWeight: 400 }}>?לא רשום</span>
                  </span>
                )}
              </Typography>
            </>
          )}
        </Paper>
      </Box>
    </Fade>
  );
}
