// Importamos el enrutador de express
import { Router } from "express";
// Ampliamos los controladores importados para incluir los nuevos
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

// Creamos una instancia de Router de Express
const router = Router();

// Rutas para las operaciones del carrito de compras
router.get("/:userId", obtenerCarrito); // Obtener el carrito de compras de un usuario
router.post("/addItem", addItemAlCarrito); // Añadir un ítem al carrito de compras
router.patch("/updateItem", actualizarCantidadItem); // Actualizar la cantidad de un ítem en el carrito
router.delete("/removeItem", eliminarItemDelCarrito); // Eliminar un ítem del carrito

// Rutas para las operaciones adicionales de manejo de compras
router.post("/finalizarCompra", finalizarCompra); // Finalizar la compra y actualizar el stock
router.get("/compras/:userId", obtenerComprasUsuario); // Ver todas las compras de un usuario
router.patch("/modificarCompra", modificarCompra); // Modificar una compra específica
router.delete("/eliminarCompra/:compraId", eliminarCompra); // Eliminar una compra específica

// Exportamos el enrutador para que pueda ser utilizado por la aplicación
export default router;
