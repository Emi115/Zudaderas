import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>Sobre Nosotros</h1>
      <div className={styles.starWarsText}>
        <p>Somos una empresa apasionada por la moda y la creatividad.</p>
        <p>En <strong>Zudaderas</strong>, nos especializamos en la creación de sudaderas personalizadas.</p>
        <p>Cada una pintada a mano con pinturas acrílicas de alta calidad.</p>
        <p>Nuestro objetivo es ofrecer piezas únicas que permitan a nuestros clientes expresar su estilo personal y originalidad.</p>
        <p>Creemos firmemente en la belleza de lo hecho a mano y en la importancia de los detalles.</p>
        <p>Lo que convierte a cada sudadera en una obra de arte.</p>
      </div>
    </div>
  );
}

export default About;
