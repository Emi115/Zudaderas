import { Router } from "express";
import {
    getUsersController,
    createUsersController,
    getUserMe,
    deleteUserController,
    updateUserController,
} from "../controllers/users-controller.js";
import { checkToken } from "../middlewares/auth-middleware.js";
// Importar la función de autorización desde el middleware de seguridad
import { authorize } from "../middlewares/seguridad-middleware.js";

const router = Router();

// Obtener la información del usuario autenticado
router.get("/me", checkToken, getUserMe);

// Obtener la lista de usuarios (requiere autenticación)
router.get("/", checkToken, authorize, getUsersController);

// Crear un nuevo usuario
router.post("/", createUsersController);

// Eliminar un usuario por su nombre de usuario
router.delete("/:username", checkToken, authorize, deleteUserController);

// Actualizar la información de un usuario por su nombre de usuario
router.patch("/:username", checkToken, updateUserController);

export default router;
