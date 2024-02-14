import React, { useState } from "react";
import "../css/formulario.css";

function CreateSudaderaForm() {
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

        fetch("http://localhost:3000/sudadera", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        <form onSubmit={handleSubmit} className="tu-clase-formulario">
            <p id="mensaje">{mensaje}</p>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="dibujo">Dibujo:</label>
                <input
                    type="text"
                    id="dibujo"
                    name="dibujo"
                    value={formData.dibujo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="talla">Talla:</label>
                <input
                    type="text"
                    id="talla"
                    name="talla"
                    value={formData.talla}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="foto">Foto principal:</label>
                <input
                    type="text"
                    id="foto"
                    name="foto"
                    value={formData.foto}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="fotosSecundarias">Fotos Secundarias:</label>
                <input
                    type="text"
                    id="fotosSecundarias"
                    name="fotosSecundarias"
                    value={formData.fotosSecundarias.join(" ")}
                    onChange={handleFotosSecundariasChange}
                />
            </div>
            <div>
                <label htmlFor="capucha">Capucha:</label>
                <input
                    type="checkbox"
                    id="capucha"
                    name="capucha"
                    checked={formData.capucha}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="precio">Precio:</label>
                <input
                    type="text"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Crear Sudadera</button>
        </form>
    );
}

export default CreateSudaderaForm;
