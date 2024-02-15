import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Asegúrate de que la ruta de importación es correcta

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Inicio</Link>
      <Link to="/about" className={styles.navLink}>Sobre mí</Link>
      <Link to="/crearsudaderas" className={styles.navLink}>Crear Sudaderas</Link>
      <Link to="/authForm" className={styles.navLink}>Login/Register</Link>
    </nav>
  );
}

export default Navbar;