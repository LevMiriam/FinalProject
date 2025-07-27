import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Alert,
  Fade
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Register({ onRegister, error }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fff3f3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Fade in={true} timeout={1000}>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 420,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ bgcolor: '#b71c1c', mb: 2 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontWeight: 700,
              color: '#b71c1c',
              mb: 2,
              textAlign: 'center'
            }}
          >
            הרשמה למערכת Way2Go
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <TextField
            label="מספר מזהה"
            type="text"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputProps={{ inputMode: 'numeric', style: { textAlign: 'center' } }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="שם מלא"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: '#b71c1c', color: 'white', fontWeight: 'bold' }}
            onClick={() => {
              if (!id || !name) return;
              onRegister({ id, name });
            }}
          >
            הרשמה
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}
