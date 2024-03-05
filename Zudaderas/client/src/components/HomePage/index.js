import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

function HomePage() {
    const [sudaderas, setSudaderas] = useState([]);
    const [pagina, setPagina] = useState(1); // Iniciar en la página 1
    const [totalSudaderas, setTotalSudaderas] = useState(0); // Nuevo estado para almacenar el total de sudaderas
    const [modalVisible, setModalVisible] = useState(false);
    const [sudaderaSeleccionada, setSudaderaSeleccionada] = useState(null);
    const [fotoPrincipal, setFotoPrincipal] = useState("");

    useEffect(() => {
        const cargarSudaderas = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/sudadera?page=${pagina}&limit=8`
                );
                if (respuesta.data && Array.isArray(respuesta.data.data)) {
                    setSudaderas(respuesta.data.data);
                    setTotalSudaderas(respuesta.data.total); // Actualiza el total de sudaderas
                } else {
                    console.error(
                        "La respuesta no contiene un arreglo de sudaderas:",
                        respuesta.data
                    );
                    setSudaderas([]);
                }
            } catch (error) {
                console.error("Error al cargar las sudaderas:", error);
                setSudaderas([]);
            }
        };

        cargarSudaderas();
    }, [pagina]);

    const siguientePagina = () => {
        // Calcula el número total de páginas
        const totalPaginas = Math.ceil(totalSudaderas / 8);
        if (pagina < totalPaginas) {
            setPagina((paginaPrev) => paginaPrev + 1);
        }
    };

    const anteriorPagina = () => {
        if (pagina > 1) {
            setPagina((paginaPrev) => paginaPrev - 1);
        }
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

    // Función para añadir al carrito
    const añadirAlCarrito = async (sudaderaId, cantidad = 1) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Por favor, inicia sesión para añadir ítems al carrito.");
            return;
        }

        try {
            const respuesta = await axios.post(
                "http://localhost:3000/compras/addItem", // Asegúrate de que la URL sea correcta según tu API
                { sudaderaId, cantidad },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (respuesta.status === 200) {
                alert("Ítem añadido al carrito correctamente.");
                cerrarModal(); // Opcionalmente puedes cerrar el modal después de añadir al carrito
            } else {
                alert("No se pudo añadir el ítem al carrito.");
            }
        } catch (error) {
            console.error("Error al añadir ítem al carrito:", error);
            alert("Hubo un problema al añadir el ítem al carrito.");
        }
    };

    return (
        <div className={styles.Pagina}>
            <h1>Zudaderas disponibles</h1>
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
            <div className={styles.botonesNav}>
                <button
                    onClick={anteriorPagina}
                    disabled={pagina <= 1} // Deshabilita el botón si estamos en la página 1
                >
                    Anterior
                </button>
                {sudaderas.length > 0 ? (
                    <button
                        onClick={siguientePagina}
                        disabled={pagina >= Math.ceil(totalSudaderas / 8)} // Deshabilita el botón si estamos en la última página
                    >
                        Siguiente
                    </button>
                ) : (
                    <p>No hay más sudaderas disponibles.</p>
                )}
            </div>
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
                                <button
                                    onClick={() =>
                                        añadirAlCarrito(
                                            sudaderaSeleccionada._id
                                        )
                                    }
                                >
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
