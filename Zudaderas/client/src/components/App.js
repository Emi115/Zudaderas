// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.js"; // Asegúrate de importar AuthProvider
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import About from "./About";
import CrearSudaderas from "./CrearSudaderas/CrearSudadera.js";
import Formulario from "Ruta al formulario";


function App() {
    return (
        <AuthProvider>
            {" "}
            {/* Envuelve todo tu Router con AuthProvider */}
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/crearsudaderas"
                        element={<CrearSudaderas />}
                    />
                    <Route path="/ruta al formulario" element={<elemento formulario/>} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
