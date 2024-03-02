/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react"; // Importar useContext si estás usando un contexto global para el token
import styles from "./CrearSudadera.module.css";

// Contexto global (si lo usas para almacenar el token)
// import { AuthContext } from '../path/to/authContext';

function CrearSudadera() {
    const [formData, setFormData] = useState({
        nombre: "",
        color: "",
        dibujo: "",
        talla: "",
        foto: "",
        fotosSecundarias: [],
        capucha: false,
        precio: "",
        descripcion: "",
        stock: "",
    });
    const [mensaje, setMensaje] = useState("");

    // Usar el contexto global para obtener el token si es aplicable
    // const { token } = useContext(AuthContext);

    // Alternativamente, obtener el token de localStorage o sessionStorage
    const token = localStorage.getItem("token"); // O sessionStorage según lo que uses

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFotosSecundariasChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            fotosSecundarias: e.target.value
                .split(" ")
                .filter((foto) => foto !== ""),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.nombre ||
            !formData.color ||
            !formData.dibujo ||
            !formData.talla ||
            !formData.foto ||
            !formData.precio ||
            !formData.descripcion ||
            !formData.stock
        ) {
            setMensaje("Por favor, rellene todos los campos necesarios.");
            return;
        }

        // Incluir el token en las cabeceras de la solicitud
        fetch("http://localhost:3000/sudadera", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Asegúrate de usar el esquema de autorización correcto
            },
            body: JSON.stringify({
                ...formData,
                talla: formData.talla.toUpperCase(),
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock, 10),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert("Sudadera creada con éxito!");
                // Opcional: Resetear el formulario aquí
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error al crear la sudadera");
            });
    };
    return (
        <form onSubmit={handleSubmit} className={styles.tuClaseFormulario}>
            <div>
                <label htmlFor="nombre" className={styles.label}>
                    Nombre:
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="color" className={styles.label}>
                    Color:
                </label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="dibujo" className={styles.label}>
                    Dibujo:
                </label>
                <input
                    type="text"
                    id="dibujo"
                    name="dibujo"
                    value={formData.dibujo}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="talla" className={styles.label}>
                    Talla:
                </label>
                <input
                    type="text"
                    id="talla"
                    name="talla"
                    value={formData.talla}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="foto" className={styles.label}>
                    Foto principal:
                </label>
                <input
                    type="text"
                    id="foto"
                    name="foto"
                    value={formData.foto}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="fotosSecundarias" className={styles.label}>
                    Fotos Secundarias:
                </label>
                <input
                    type="text"
                    id="fotosSecundarias"
                    name="fotosSecundarias"
                    value={formData.fotosSecundarias.join(" ")}
                    onChange={handleFotosSecundariasChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="capucha" className={styles.label}>
                    Capucha:
                </label>
                <input
                    type="checkbox"
                    id="capucha"
                    name="capucha"
                    checked={formData.capucha}
                    onChange={handleChange}
                    className={styles.input} // Asumiendo que quieres aplicar un estilo genérico a todos los inputs, incluyendo checkboxes
                />
            </div>
            <div>
                <label htmlFor="precio" className={styles.label}>
                    Precio:
                </label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="descripcion" className={styles.label}>
                    Descripción:
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className={`${styles.textarea}`} // Agregado según el patrón de clase sugerido en CSS
                    style={{ resize: "none" }}
                />
            </div>
            <div>
                <label htmlFor="stock" className={styles.label}>
                    Stock:
                </label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            {/* Mensaje de error con la clase actualizada */}
            <p id="mensaje" className={mensaje ? styles.mensajeError : ""}>
                {mensaje}
            </p>

            <button type="submit" className={styles.boton}>
                Crear Sudadera
            </button>
        </form>
    );
}

export default CrearSudadera;
