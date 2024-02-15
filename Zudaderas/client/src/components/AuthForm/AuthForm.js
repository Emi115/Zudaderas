/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "", // Cambiado a phoneNumber para coincidir con el esquema
    });
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = isLogin
            ? "http://localhost:3000/login"
            : "http://localhost:3000/users";
        const payload = isLogin
            ? { username: formData.username, password: formData.password }
            : formData;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en la solicitud");
            }

            const data = await response.json();

            if (data.token) {
                setToken(data.token);
                setMessage(
                    isLogin
                        ? "Inicio de sesión exitoso"
                        : "Usuario creado con éxito"
                );
            } else {
                throw new Error("No se recibió token");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
            setMessage(error.message); // Mostrar el mensaje de error
        }
    };

    return (
        <div className={styles.authForm}>
            <button onClick={() => setIsLogin(!isLogin)}>
                Cambiar a {isLogin ? "Registro" : "Login"}
            </button>
            <form onSubmit={handleSubmit}>
                {/* Manejo condicional de campos dependiendo si es login o registro */}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nombre de usuario"
                    required
                    className={styles.input}
                />
                {!isLogin && (
                    <>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Número de teléfono"
                            required
                            className={styles.input}
                        />
                    </>
                )}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    {isLogin ? "Iniciar sesión" : "Registrarse"}
                </button>
                {/* Mensajes de éxito/error */}
                {message && <div className={styles.message}>{message}</div>}
            </form>
        </div>
    );
};

export default AuthForm;
