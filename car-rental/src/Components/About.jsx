import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import logo from '../assets/cars/logo2.png'; // ודא שהלוגו נמצא בנתיב הזה

export default function About() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'white', // רקע לבן
        px: 2,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 650,
          width: '100%',
          alignItems: 'center',
          bgcolor: 'rgba(20,20,20,0.96)',
          borderRadius: 5,
          boxShadow: '0 6px 32px 0 rgba(255,0,0,0.10)',
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 6 },
          border: '2px solid #b71c1c',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Way2Go Logo"
            sx={{
              width: 220,
              mb: 1,
              filter: 'drop-shadow(0 2px 8px #b71c1c88)',
              userSelect: 'none',
            }}
          />
        </Box>
        <Divider sx={{ width: 120, borderBottomWidth: 2, borderColor: '#b71c1c', mb: 1 }} />
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1,
          }}
        >
          האתר המוביל להשכרת רכבים לחופשות, טיולים ועסקים
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#fff',
            fontWeight: 300,
            lineHeight: 2,
            textAlign: 'center',
            fontSize: '1.1rem',
          }}
        >
          ברוכים הבאים ל-Way2Go – כאן תמצאו מגוון רכבים להשכרה, החל מרכבים קטנים ועד רכבי יוקרה, במחירים משתלמים במיוחד. האתר שלנו שם דגש על חווית משתמש מקצועית, קלה ונעימה, עם ממשק הזמנה מהיר, שירות אישי, ומענה מהיר לכל שאלה.
          <br /><br />
          כל התהליך מתבצע אונליין: בוחרים רכב, מזינים פרטים, משווים מחירים ומקבלים אישור מיידי  בלי בירוקרטיה, בלי אותיות קטנות ובלי הפתעות.
          <br /><br />
           השירות שלנו מתאים במיוחד לחופשות בארץ ובחו"ל, לטיולים משפחתיים, נסיעות עסקים, או כל צורך אחר
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#e53935',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '1.15rem',
            letterSpacing: 1,
            mt: 1,
            textShadow: '0 1px 8px #000',
          }}
        >
          !הצטרפו לאלפי לקוחות מרוצים ותיהנו מהשכרת רכב בראש שקט
            לכל פנייה ניתן לפנות לצוות האתר במייל:{" "}
          <a
            href="mailto:way2gocomp@gmail.com"
            style={{ color: '#b71c1c', textDecoration: 'underline', direction: 'ltr' }}
          >
            way2gocomp@gmail.com
          </a>
        </Typography>
      </Stack>
    </Box>
  );
}