// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarritoModal from "../Carrito/CarritoModal.js"; // Asegúrate de tener este componente creado y su ruta correcta
import styles from "./Navbar.module.css";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userRole = localStorage.getItem("userRole");

    const toggleModal = () => setIsModalOpen(!isModalOpen);

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
                <button onClick={toggleModal} className={styles.navButton}>
                    Carrito
                </button>
            </div>
            {isModalOpen && <CarritoModal closeModal={toggleModal} />}
        </nav>
    );
}

export default Navbar;
