import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { init } from "./loaders/index.js";
import config from "./config.js";

const app = express();

// Obtiene la ruta del archivo actual en el contexto de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura Express para servir archivos estáticos desde la carpeta 'build' de la aplicación React
app.use(express.static(path.join(__dirname, "../../client/build")));

// Inicializa las demás configuraciones y middlewares
init(app, config);

// Captura todas las solicitudes GET y las dirige al index.html de React para permitir la navegación del lado del cliente
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

export default app;
