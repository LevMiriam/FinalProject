import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Alert,
  Fade,
  Divider
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Register({ onRegister, onBack }) {
  const [form, setForm] = useState({ name: '', id: '', phone: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.id || !form.phone || !form.email) {
      setError('אנא מלא את כל השדות');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('נרשמת בהצלחה!');
    onRegister(form);
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'linear-gradient(120deg, #fafdff 0%, #eaf6fb 100%)',
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          borderRadius: 5,
          boxShadow: '0 8px 32px 0 rgba(33,180,243,0.07)',
          bgcolor: '#fafdff',
        }}>
          <Avatar sx={{ bgcolor: '#fff', mb: 2, width: 56, height: 56, border: '2px solid #b3e5fc' }}>
            <PersonAddAlt1Icon fontSize="large" sx={{ color: '#0288d1' }} />
          </Avatar>
          <Typography variant="h5" sx={{
            fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif',
            fontWeight: 700,
            color: '#222',
            mb: 1,
            textAlign: 'center',
            letterSpacing: 1,
            fontSize: '2.1rem',
            textShadow: '0 2px 8px #e3f2fd',
          }}>
            Register
          </Typography>
          <Divider sx={{ width: 60, mb: 2, borderBottomWidth: 2, borderColor: '#b3e5fc' }} />
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="שם מלא"
                name="name"
                variant="standard"
                sx={{ mb: 2, background: '#fff', borderRadius: 2, maxWidth: 320, mx: 'auto', '& input': { textAlign: 'center' }, '& label': { left: '50%', transform: 'translateX(-50%)' }, '& legend': { textAlign: 'center', width: '100%' } }}
                value={form.name}
                onChange={handleChange}
                InputProps={{ sx: { fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 500, textAlign: 'center' } }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="תעודת זהות"
                name="id"
                type="text"
                variant="standard"
                sx={{ mb: 2, background: '#fff', borderRadius: 2, maxWidth: 320, mx: 'auto', '& input': { textAlign: 'center' }, '& label': { left: '50%', transform: 'translateX(-50%)' }, '& legend': { textAlign: 'center', width: '100%' } }}
                value={form.id}
                onChange={handleChange}
                InputProps={{ sx: { fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 500, textAlign: 'center' } }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="טלפון"
                name="phone"
                variant="standard"
                sx={{ mb: 2, background: '#fff', borderRadius: 2, maxWidth: 320, mx: 'auto', '& input': { textAlign: 'center' }, '& label': { left: '50%', transform: 'translateX(-50%)' }, '& legend': { textAlign: 'center', width: '100%' } }}
                value={form.phone}
                onChange={handleChange}
                InputProps={{ sx: { fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 500, textAlign: 'center' } }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="אימייל"
                name="email"
                type="email"
                variant="standard"
                sx={{ mb: 2, background: '#fff', borderRadius: 2, maxWidth: 320, mx: 'auto', '& input': { textAlign: 'center' }, '& label': { left: '50%', transform: 'translateX(-50%)' }, '& legend': { textAlign: 'center', width: '100%' } }}
                value={form.email}
                onChange={handleChange}
                InputProps={{ sx: { fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 500, textAlign: 'center' } }}
              />
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <Button
              type="submit"
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
            >
              הרשמה
            </Button>
          </form>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ mt: 3, color: '#1976d2', fontWeight: 700, fontFamily: '"Satisfy", "Varela Round", "Rubik", "Comic Sans MS", cursive, sans-serif', textTransform: 'none', bgcolor: '#e3f6fd', '&:hover': { bgcolor: '#b6e4fa' } }}
          >
            חזרה להתחברות
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}
