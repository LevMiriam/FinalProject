import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/Home';
import Cars from './Components/CarsList';
import Container from '@mui/material/Container';

export default function App() {
  return (
    <Router>
      <Header />
      <Container sx={{ mt: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </Router>
  );
}
