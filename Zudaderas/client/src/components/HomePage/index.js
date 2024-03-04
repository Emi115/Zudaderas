import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

function HomePage() {
    const [sudaderas, setSudaderas] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [sudaderaSeleccionada, setSudaderaSeleccionada] = useState(null);
    const [fotoPrincipal, setFotoPrincipal] = useState("");

    useEffect(() => {
        const cargarSudaderas = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/sudadera?skip=${pagina}&limit=8`
                );
                setSudaderas(respuesta.data);
            } catch (error) {
                console.error("Error al cargar las sudaderas:", error);
            }
        };

        cargarSudaderas();
    }, [pagina]);

    const cargarMas = () => {
        setPagina((paginaPrev) => paginaPrev + 8);
    };

    const abrirModal = (sudadera) => {
        setSudaderaSeleccionada(sudadera);
        // Asegúrate de que sudadera.fotosSecundarias[0] exista; de lo contrario, usa sudadera.foto como respaldo
        setFotoPrincipal(
            sudadera.fotosSecundarias?.[0]
                ? `/images/${sudadera.fotosSecundarias[0]}`
                : `/images/${sudadera.foto}`
        );
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setSudaderaSeleccionada(null);
    };
    const cambiarFotoPrincipal = (foto) => {
        setFotoPrincipal(`/images/${foto}`);
    };

    function middlewareCarrito({ children }) {
        const token = localStorage.getItem("token");

        if (!token) {
            // Si no hay token, redirigir a la ruta de formulario
            const puerto = window.location.port || "3001"; // Usa el puerto actual o 3001 si no se encuentra
            window.location.href = `http://localhost:${puerto}/Formulario`;
        } else {
            // Si hay token, mostrar un mensaje indicando que la función de carrito no está implementada
            alert("Esta función de carrito no está implementada");
        }
    }

    return (
        <div className={styles.Pagina}>
            <h1>Zudaderas</h1>
            <div className={styles.productosContainer}>
                {sudaderas.map((sudadera) => (
                    <div key={sudadera.nombre} className={styles.producto}>
                        <img
                            src={`/images/${sudadera.foto}`}
                            alt={sudadera.nombre}
                            className={styles.productoImagen}
                        />

                            <h3>{sudadera.nombre}</h3>
                            <p>{sudadera.precio}€</p>
                            <button
                                onClick={() => abrirModal(sudadera)}
                                className={styles.verMasBoton}
                            >
                               Precio y detalles
                            </button>

                    </div>
                ))}
            </div>
            {sudaderas.length > 0 && (
                <button onClick={cargarMas} className={styles.cargarMasBoton}>
                    Cargar más
                </button>
            )}
            {modalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span
                            className={styles.closeButton}
                            onClick={cerrarModal}
                        >
                            &times;
                        </span>
                        <div className={styles.modalBody}>
                            <div className={styles.modalImageContainer}>
                                <div className={styles.modalImage}>
                                    <img
                                        src={fotoPrincipal}
                                        alt="Imagen Principal"
                                    />
                                </div>
                                <div className={styles.modalSecondaryImages}>
                                    {sudaderaSeleccionada.fotosSecundarias.map(
                                        (foto, index) => (
                                            <img
                                                key={index}
                                                src={`/images/${foto}`}
                                                alt={`Secundaria ${index + 1}`}
                                                onClick={() =>
                                                    cambiarFotoPrincipal(foto)
                                                }
                                                className={
                                                    styles.imagenSecundaria
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className={styles.modalInfo}>
                                <h2>{sudaderaSeleccionada.nombre}</h2>
                                <p>Color: {sudaderaSeleccionada.color}</p>
                                <p>Talla: {sudaderaSeleccionada.talla}</p>
                                <p>Precio: {sudaderaSeleccionada.precio}€</p>
                                <p>Stock: {sudaderaSeleccionada.stock}</p>
                                <p>
                                    Descripción:{" "}
                                    {sudaderaSeleccionada.descripcion}
                                </p>
                                <button onClick={middlewareCarrito}>
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
