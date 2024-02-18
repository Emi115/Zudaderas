// Importamos el enrutador de express
import { Router } from "express";
// Importamos los controladores necesarios para las operaciones CRUD de sudaderas
import {
    createSudadera,
    updateSudadera,
    getSudaderas,
    deleteSudadera,
    searchSudaderas,
} from "../controllers/sudadera-controller.js";

// Creamos una instancia de Router de Express
const router = Router();

// Definimos las rutas para las operaciones CRUD de sudaderas

// Obtener todas las sudaderas (de 10 en 10)
router.get("/", getSudaderas);

// Crear una nueva sudadera
router.post("/", createSudadera);

// Actualizar una sudadera existente por su ID
router.patch("/:id", updateSudadera);

// Eliminar una sudadera por su ID
router.delete("/:id", deleteSudadera);

// Buscar sudaderas basadas en criterios específicos
router.get("/search", searchSudaderas);

// Exportamos el enrutador para que pueda ser utilizado por la aplicación
export default router;
