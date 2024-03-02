// Importamos el enrutador de express
import { Router } from "express";
import {
    addItemAlCarrito,
    eliminarItemDelCarrito,
    actualizarCantidadItem,
    obtenerCarrito,
    finalizarCompra,
    obtenerComprasUsuario,
    modificarCompra,
    eliminarCompra,
} from "../controllers/compra-controller.js";

// Importa aquí tu middleware de autenticación
import { verificarToken } from "../middlewares/middlewareDeAutenticacion.js"; // Asegúrate de que la ruta sea correcta

// Creamos una instancia de Router de Express
const router = Router();

// Rutas para las operaciones del carrito de compras
// Aplica el middleware de autenticación a las rutas que requieran autenticación
router.get("/carrito", verificarToken, obtenerCarrito); // Obtener el carrito de compras de un usuario
router.post("/addItem", verificarToken, addItemAlCarrito); // Añadir un ítem al carrito de compras
router.patch("/updateItem", verificarToken, actualizarCantidadItem); // Actualizar la cantidad de un ítem en el carrito
router.delete("/removeItem", verificarToken, eliminarItemDelCarrito); // Eliminar un ítem del carrito

// Rutas para las operaciones adicionales de manejo de compras
router.post("/finalizarCompra", verificarToken, finalizarCompra); // Finalizar la compra y actualizar el stock
router.get("/compras/:userId", verificarToken, obtenerComprasUsuario); // Ver todas las compras de un usuario
router.patch("/modificarCompra", verificarToken, modificarCompra); // Modificar una compra específica
router.delete("/eliminarCompra/:compraId", verificarToken, eliminarCompra); // Eliminar una compra específica

// Exportamos el enrutador para que pueda ser utilizado por la aplicación
export default router;
