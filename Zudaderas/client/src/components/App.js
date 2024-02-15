import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import About from './About';
import CrearSudaderas from './CrearSudaderas/CrearSudadera.js'; // Asegúrate de tener este componente
import AuthForm from './AuthForm/AuthForm.js'; // Asegúrate de tener este componente

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/crearsudaderas" element={<CrearSudaderas />} />
        <Route path="/authForm" element={<AuthForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
