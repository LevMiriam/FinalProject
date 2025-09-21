import React from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
  width: '90vw',
  maxWidth: '90vw',
  margin: '0 auto',
  height: { xs: '80px', md: '2.5cm' },
        bgcolor: 'linear-gradient(120deg, #eaf6fb 0%, #b3e5fc 100%)',
        color: '#000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 0, md: 8 },
        py: 2,
        position: 'static',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        boxShadow: '0 -2px 12px 0 rgba(33,180,243,0.10)',
        borderTop: '2px solid #b3e5fc',
        direction: 'rtl',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif', mb: 1, color: '#000' }}>
         Way2Go
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Varela Round, Rubik, Comic Sans MS, cursive, sans-serif', color: '#000' }}>
           השכרת רכבים בקלות ובמהירות. שירות לקוחות 24/6, מבחר רכבים רחב, מחירים משתלמים, הזמנות אונליין, שירות אמין ומקצועי.
        </Typography>
      </Box>
      <Stack direction="row" spacing={2}>
        <IconButton href="https://facebook.com" target="_blank" rel="noopener" sx={{ color: '#1976d2', bgcolor: '#fff', borderRadius: '50%', boxShadow: 1, '&:hover': { bgcolor: '#b3e5fc' } }}>
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" rel="noopener" sx={{ color: '#1976d2', bgcolor: '#fff', borderRadius: '50%', boxShadow: 1, '&:hover': { bgcolor: '#b3e5fc' } }}>
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" rel="noopener" sx={{ color: '#1976d2', bgcolor: '#fff', borderRadius: '50%', boxShadow: 1, '&:hover': { bgcolor: '#b3e5fc' } }}>
          <TwitterIcon fontSize="large" />
        </IconButton>
        <IconButton href="mailto:info@way2go.com" sx={{ color: '#1976d2', bgcolor: '#fff', borderRadius: '50%', boxShadow: 1, '&:hover': { bgcolor: '#b3e5fc' } }}>
          <EmailIcon fontSize="large" />
        </IconButton>
      </Stack>
    </Box>
  );
}
