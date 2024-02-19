// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.navLink}>
                Inicio
            </Link>
            <Link to="/about" className={styles.navLink}>
                Sobre mí
            </Link>
            <Link to="/crearsudaderas" className={styles.navLink}>
                Crear Sudaderas
            </Link>
            <Link to="/Formulario" className={styles.navLink}>
                Login/Register
            </Link>
            <Link to="/" className={styles.navLink}>
                Mas Buscados
            </Link>

        </nav>
    );
}

export default Navbar;
