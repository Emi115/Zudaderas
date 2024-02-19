// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import About from "./About";
import CrearSudaderas from "./CrearSudaderas/CrearSudadera.js";
import UserComponent from "./Formulario/UserComponent.js";


// eslint-disable-next-line no-unused-vars
import styles from "./App.module.css"; // Asegúrate de que la ruta sea correcta
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/crearsudaderas" element={<CrearSudaderas />} />
                <Route path="/Formulario" element={<UserComponent />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
