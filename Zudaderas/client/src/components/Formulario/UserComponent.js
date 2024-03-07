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

    //Formulario de registro
    // Fenastilla de formulario de registro
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Crea eṕica el emparto objuz para su emisión.
        const sendData = {
            username: userData.registerUsername, // Tus dómines tegrameríertem a emplear 'registerUsername'
            password: userData.registerPassword, // Justamente como 'registerPassword'
            email: userData.email, // Asegúrate de mapear 'email' correctamente
            phoneNumber: userData.phoneNumber,
            // A continuación, medeamos la putefisha de adress para satisfacer el origen Mongoose
            address: userData.address,
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/users",
                sendData
            );
            console.log("Success:", response.data);
            alert("Usuario registrado con éxito!");

            // Defectuamos contextos de cerldad para la repanible de la eductiona
            setUserData({
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
            setView("login");
        } catch (error) {
            console.error("Error:", error);
            alert(
                "Error al registrar usuario. Por favor, asegúrate de que todos los campos son llenados correctamente."
            );
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
            localStorage.setItem("token", response.data.token); // Asumiendo que el token también se envía como parte de la respuesta

            // Restablecer userCredentials a sus valores iniciales
            setUserCredentials({
                username: "",
                password: "",
            });

            // Actualizar el estado para reflejar que el usuario ha iniciado sesión
            setIsAuthenticated(true);
            setView("viewUser");

            // Opcionalmente, puedes buscar más información del usuario aquí si es necesario
            await fetchUserInfo(response.data.token);

            // Espera medio segundo antes de recargar la página
            setTimeout(() => {
                window.location.reload(); // Considera evitar recargar la página para una experiencia de usuario más fluida.
            }, 500);
        } catch (error) {
            alert("Error haciendo login");
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
            localStorage.setItem("userRole", response.data.role);
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
            alert("Informacion Guardada que tenga un buen dia"); // Muestra un mensaje de éxito
        } catch (error) {
            alert("Error actualizando datos"); // Muestra un mensaje de error en caso de fallo
            console.error(error);
        }
    };

    const handleLogout = () => {
        // Cierra la sesión del usuario.
        localStorage.removeItem("token");
        //Cierra la sesion dek¡l UserRole por si es admin
        localStorage.removeItem("userRole");

        // Restablece los estados a sus valores predeterminados
        setIsAuthenticated(false);
        setView("login"); // Cambia la vista al formulario de inicio de sesión.

        // Restablece los estados de los datos del formulario
        setUserCredentials({
            username: "",
            password: "",
        });

        // Restablece los estados de los datos del usuario
        setUserData({
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
        window.location.reload(); // Considera evitar recargar la página para una experiencia de usuario más fluida.

        // Si tienes otros estados que necesitan ser limpiados, asegúrate de restablecerlos aquí.
    };

    // Componentes de la interfaz de usuario para el formulario de inicio de sesión, registro y visualización de la información del usuario.
    const LoginForm = (
        <form onSubmit={handleLoginSubmit} className={styles.form}>
            <input
                name="username"
                value={userCredentials.username}
                onChange={handleChange}
                placeholder="Usuario"
                className={styles.input}
            />
            <input
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Iniciar Sesion
            </button>

            <button
                type="button"
                onClick={() => setView("register")}
                className={`${styles.button} ${styles.buttonSecondary}`}
            >
                Registrarse
            </button>
        </form>
    );

    const RegisterForm = (
        <form onSubmit={handleRegisterSubmit} className={styles.form}>
            <input
                type="text"
                name="registerUsername"
                value={userData.username}
                onChange={handleChange}
                placeholder="Nombre del Usuario"
                className={styles.input}
                required
            />

            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
            />

            <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="Numero de telefono"
                className={styles.input}
            />

            <input
                type="password"
                name="registerPassword"
                value={userData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className={styles.input}
                required
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
                        <div className={styles.alinearItems}>
                            {userInfo.profilePicture && (
                                <p>
                                    <img
                                        className={styles.FotoPerfil}
                                        src={userInfo.profilePicture} // Usa la ruta dinámica basada en userInfo.profilePicture
                                        alt="Foto de perfil"
                                        draggable="false"
                                    />
                                </p>
                            )}
                            <p className={styles.Texto}>
                                Nombre: {userInfo.username}
                            </p>
                            <p className={styles.Texto}>
                                Gmail: {userInfo.email}
                            </p>
                            <p className={styles.Texto}>
                                Numero de Telefono: {userInfo.phoneNumber}
                            </p>

                            <div>
                                <p className={styles.Texto}>
                                    Calle: {userInfo.address?.street}
                                </p>
                                <p className={styles.Texto}>
                                    Ciudad: {userInfo.address?.city}
                                </p>
                                <p className={styles.Texto}>
                                    Provincia: {userInfo.address?.state}
                                </p>
                                <p className={styles.Texto}>
                                    Codigo Postal: {userInfo.address?.zip}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.Texto}>
                            Loading user information...
                        </p>
                    )}
                    <div className={styles.BotonesDiv}>
                        <button
                            onClick={handleEditUserInfo}
                            className={styles.button}
                        >
                            Editar Perfil
                        </button>

                        <button
                            onClick={handleLogout}
                            className={`${styles.button} ${styles.buttonSecondary}`}
                        >
                            Cerrar Sesion
                        </button>
                    </div>
                </>
            )}
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
