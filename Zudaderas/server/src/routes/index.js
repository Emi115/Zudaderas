// Importamos express y los controladores y rutas necesarios
import express from "express";
import { login } from "../controllers/login-controller.js";
import userRouter from "./user-router.js";
import sudaderaRouter from "./sudadera-router.js";
import comprasRouter from "./compras-router.js";

// Creamos una instancia de Router de Express
const router = express.Router();

// Definimos la ruta para el inicio de sesión
router.post("/login", login);

// Utilizamos las rutas definidas en userRouter para las operaciones relacionadas con usuarios
router.use("/users", userRouter);

// Utilizamos las rutas definidas en sudaderaRouter para las operaciones relacionadas con sudaderas
router.use("/sudadera", sudaderaRouter);

// Utilizamos las rutas definidas en comprasRouter para las operaciones relacionadas con compras
router.use("/compras", comprasRouter);

// Exportamos el enrutador para que pueda ser utilizado por la aplicación
export default router;
