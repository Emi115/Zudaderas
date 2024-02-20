// App.js o donde manejes tus rutas
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import About from "./About";
import CrearSudaderas from "./CrearSudaderas/CrearSudadera.js";
import UserComponent from "./Formulario/UserComponent.js";

function PrivateRoute({ children }) {
    const userRole = localStorage.getItem("userRole");
    debugger;
    console.log("Rol del usuario:", userRole); // Esto te ayudará a verificar qué se está recuperando
    return userRole === "admin" ? children : <Navigate to="/Formulario" />;
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/crearsudaderas"
                    element={
                        <PrivateRoute>
                            <CrearSudaderas />
                        </PrivateRoute>
                    }
                />
                <Route path="/Formulario" element={<UserComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
