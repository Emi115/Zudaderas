// Importamos la aplicación Express desde app.js y la configuración desde config.js
import app from "./app.js";
import config from "./config.js";

// Extraemos el puerto del objeto de configuración
const { port } = config;

// Iniciamos el servidor de la aplicación Express para escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`); // Imprimimos un mensaje en la consola cuando el servidor está listo
});
