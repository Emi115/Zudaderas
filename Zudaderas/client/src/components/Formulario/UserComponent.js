import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserComponent.module.css"; // Asegúrate de que la ruta sea correcta

function UserComponent() {
    // Estados para controlar el estado de autenticación, edición, la vista actual y los datos del usuario.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState("login"); // Puede ser 'login', 'register', o 'viewUser'.

    const [userData, setUserData] = useState({
        // Datos para el registro de usuarios.
        registerUsername: "",
        email: "",
        phoneNumber: "",
        registerPassword: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
    });

    const [userCredentials, setUserCredentials] = useState({
        // Credenciales para el inicio de sesión.
        username: "",
        password: "",
    });
    // eslint-disable-next-line no-unused-vars
    const [userInfo, setUserInfo] = useState(null); // Información del usuario autenticado.

    useEffect(() => {
        // Se ejecuta al montar el componente. Verifica si el usuario ya está autenticado.
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            setView("viewUser");
            fetchUserInfo(token);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in userData) {
            // Si el nombre está en userData, actualiza userData.
            setUserData((prev) => ({ ...prev, [name]: value }));
        } else if (name in userCredentials) {
            // Si el nombre está en userCredentials, actualiza userCredentials.
            setUserCredentials((prev) => ({ ...prev, [name]: value }));
        } else if (name in userData.address) {
            // Si el nombre está en userData.address, actualiza la dirección.
            setUserData((prev) => ({
                ...prev,
                address: { ...prev.address, [name]: value },
            }));
        }
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            // Asigna userCredentials para el registro si es necesario
            const registerData = {
                ...userData,
                username: userData.username,
                password: userData.password,
            };
            await axios.post("http://localhost:3000/users", registerData);
            alert("User registered successfully. Please log in.");
            setView("login");
        } catch (error) {
            alert("Error registering user");
            console.error(error);
        }
    };

    // Actualiza la función de inicio de sesión si es necesario para reflejar cualquier cambio
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                userCredentials
            );
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true);
            setView("viewUser");
            fetchUserInfo(response.data.token);
        } catch (error) {
            alert("Error logging in");
            console.error(error);
        }
    };

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get("http://localhost:3000/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserInfo(response.data); // Actualiza la información del usuario autenticado.
            setUserData(response.data); // Prepara los datos para la edición.
        } catch (error) {
            console.error("Error fetching user info", error);
        }
    };

    const handleEditUserInfo = () => {
        setIsEditing(true); // Activa el estado de edición.
    };

    const handleSaveUserInfo = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

        try {
            const token = localStorage.getItem("token");
            const usernameToUpdate = userInfo.username; // Obtiene el nombre de usuario del estado

            // Crea una copia de userData excluyendo el nombre de usuario y la contraseña
            const { username, password, ...updateData } = userData;

            const url = `http://localhost:3000/users/${usernameToUpdate}`; // Construye la URL con el nombre de usuario

            await axios.patch(url, updateData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envía el token de autenticación
                },
            });

            setIsEditing(false); // Desactiva el modo de edición
            fetchUserInfo(token); // Actualiza la información del usuario mostrada
            alert("User info updated successfully"); // Muestra un mensaje de éxito
        } catch (error) {
            alert("Error updating user info"); // Muestra un mensaje de error en caso de fallo
            console.error(error);
        }
    };

    const handleLogout = () => {
        // Cierra la sesión del usuario.
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setView("login"); // Cambia la vista al formulario de inicio de sesión.
    };

    // Componentes de la interfaz de usuario para el formulario de inicio de sesión, registro y visualización de la información del usuario.
    const LoginForm = (
        <form onSubmit={handleLoginSubmit} className={styles.form}>
            <input
                name="username"
                value={userCredentials.username}
                onChange={handleChange}
                placeholder="Username"
                className={styles.input}
            />
            <input
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={handleChange}
                placeholder="Password"
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Login
            </button>
            <button
                type="button"
                onClick={() => setView("register")}
                className={`${styles.button} ${styles.buttonSecondary}`}
            >
                Register
            </button>
        </form>
    );

    const RegisterForm = (
        <form onSubmit={handleRegisterSubmit} className={styles.form}>
            {/* Campo para el nombre de usuario */}
            <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                className={styles.input}
                required
            />
            {/* Campo para el correo electrónico */}
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
            />
            {/* Campo para el teléfono */}
            <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={styles.input}
            />
            {/* Campo para la contraseña */}
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                className={styles.input}
                required
            />
            {/* Campo para la URL de la foto de perfil */}
            <input
                type="text"
                name="profilePicture"
                value={userData.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Register
            </button>
            <button
                type="button"
                onClick={() => setView("login")}
                className={styles.buttonSecondary}
            >
                Back to Login
            </button>
        </form>
    );

    const UserInfo = (
        <div className={styles.userInfoContainer}>
            {isEditing ? (
                <form onSubmit={handleSaveUserInfo} className={styles.form}>
                    {/* Campos editables para cada propiedad del usuario */}

                    <input
                        type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                email: e.target.value,
                            })
                        }
                        className={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Phone Number"
                        value={userData.phoneNumber}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                phoneNumber: e.target.value,
                            })
                        }
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Profile Picture URL"
                        value={userData.profilePicture}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                profilePicture: e.target.value,
                            })
                        }
                        className={styles.input}
                    />
                    {/* Dirección */}
                    <input
                        type="text"
                        placeholder="Street"
                        value={userData.address.street}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                address: {
                                    ...userData.address,
                                    street: e.target.value,
                                },
                            })
                        }
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={userData.address.city}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                address: {
                                    ...userData.address,
                                    city: e.target.value,
                                },
                            })
                        }
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={userData.address.state}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                address: {
                                    ...userData.address,
                                    state: e.target.value,
                                },
                            })
                        }
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Zip"
                        value={userData.address.zip}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                address: {
                                    ...userData.address,
                                    zip: e.target.value,
                                },
                            })
                        }
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Save
                    </button>
                </form>
            ) : (
                <>
                    {userInfo ? (
                        <div>
                            <p>Username: {userInfo.username}</p>
                            <p>Email: {userInfo.email}</p>
                            <p>Phone Number: {userInfo.phoneNumber}</p>
                            {userInfo.profilePicture && (
                                <p>
                                    Profile Picture:
                                    <img
                                        src={`/images/${userInfo.profilePicture}`} // Usa la ruta dinámica basada en userInfo.profilePicture
                                        alt="Profile"
                                        className={styles.profilePicture}
                                    />
                                </p>
                            )}
                            <div>
                                <p>Address:</p>
                                <p>Street: {userInfo.address?.street}</p>
                                <p>City: {userInfo.address?.city}</p>
                                <p>State: {userInfo.address?.state}</p>
                                <p>Zip: {userInfo.address?.zip}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user information...</p>
                    )}
                    <button
                        onClick={handleEditUserInfo}
                        className={styles.button}
                    >
                        Edit
                    </button>
                </>
            )}
            <button
                onClick={handleLogout}
                className={`${styles.button} ${styles.buttonSecondary}`}
            >
                Logout
            </button>
        </div>
    );

    // Renderizado condicional basado en el estado de autenticación y la vista actual.
    return (
        <div className={styles.container}>
            {view === "login" && !isAuthenticated && LoginForm}
            {view === "register" && !isAuthenticated && RegisterForm}
            {view === "viewUser" && isAuthenticated && UserInfo}
        </div>
    );
}
export default UserComponent;
