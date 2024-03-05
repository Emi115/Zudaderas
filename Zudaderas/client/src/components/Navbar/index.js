// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const userRole = localStorage.getItem("userRole");

    return (
        <nav className={styles.navbar}>
            <div className={styles.linksContainer}>
                <Link to="/" className={styles.navLink}>
                    Inicio
                </Link>
                <Link to="/about" className={styles.navLink}>
                    Sobre Nosotros
                </Link>
                {userRole === "admin" && (
                    <Link to="/crearsudaderas" className={styles.navLink}>
                        Crear Sudaderas
                    </Link>
                )}
            </div>
            <img
                src="/images/GladiusNofondo.png"
                alt="Logo"
                className={styles.logo}
            />
            <div className={styles.linksContainer}>
                <Link to="/Formulario" className={styles.navLink}>
                    Usuario
                </Link>
                <Link to="/" className={styles.navLink}>
                    Categorias
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
