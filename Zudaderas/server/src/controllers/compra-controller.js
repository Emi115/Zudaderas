import mongoose from "mongoose";
import Compra from "../models/Compra.js"; // Asegúrate de que este es el modelo correcto
import Sudadera from "../models/Sudadera.js"; // Asegúrate de que este es el modelo correcto
import User from "../models/User.js"; // Asegúrate de importar el modelo de User correctamente
import Logger from "../utils/logger.js";

// Añadir un ítem al carrito de compras
export async function addItemAlCarrito(req, res) {
    const { sudaderaId, cantidad } = req.body;

    // Verificar si la sudaderaId existe
    try {
        const sudadera = await Sudadera.findById(sudaderaId);
        if (!sudadera) {
            return res
                .status(404)
                .json({ message: "La sudadera con esta ID no existe." });
        }
        // Usar req.user.username para obtener la información del usuario
        const usuario = await User.findOne({ username: req.user.username });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        let compra = await Compra.findOne({ user: usuario._id });

        if (!compra) {
            compra = new Compra({
                user: usuario._id,
                nombreUsuario: usuario.username, // Usar directamente el nombre de usuario del token
                items: [{ item: sudaderaId, cantidad }],
            });
        } else {
            const itemIndex = compra.items.findIndex((item) =>
                item.item.equals(sudaderaId)
            );
            if (itemIndex > -1) {
                compra.items[itemIndex].cantidad += cantidad;
            } else {
                compra.items.push({ item: sudaderaId, cantidad });
            }
            // El nombre de usuario ya está asegurado por el token, así que no necesitas actualizarlo aquí
        }

        await compra.save();
        res.status(200).json(compra);
    } catch (error) {
        Logger.error("Error al añadir item al carrito: ", error);
        res.status(500).json({ message: "Error al añadir item al carrito" });
    }
}

// Obtener el carrito de compras de un usuario
// Obtener el carrito de compras de un usuario
export async function obtenerCarrito(req, res) {
    // Utilizar el userId del token de autenticación
    const userId = req.user.id;

    try {
        const compra = await Compra.findOne({ user: userId }).populate(
            "items.item"
        );
        if (compra) {
            // Calcula el precio total de los ítems en el carrito
            let precioTotal = 0;
            for (const item of compra.items) {
                precioTotal += item.cantidad * item.item.precio;
            }

            // Actualiza el precioTotal en el objeto de respuesta sin modificar la base de datos
            compra.precioTotal = precioTotal;

            res.status(200).json(compra);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al obtener el carrito: ", error);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
}

// Actualizar la cantidad de un ítem en el carrito
export async function actualizarCantidadItem(req, res) {
    // Utilizar el userId del token de autenticación
    const userId = req.user.id;
    const { sudaderaId, cantidad } = req.body;

    try {
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            const item = compra.items.find((item) =>
                item.item.equals(sudaderaId)
            );
            if (item) {
                item.cantidad = cantidad;
                await compra.save();
                res.status(200).json(compra);
            } else {
                res.status(404).json({
                    message: "Ítem no encontrado en el carrito",
                });
            }
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al actualizar cantidad del ítem: ", error);
        res.status(500).json({
            message: "Error al actualizar cantidad del ítem",
        });
    }
}

// Eliminar un ítem del carrito
export async function eliminarItemDelCarrito(req, res) {
    // Utilizar el userId del token de autenticación
    const userId = req.user.id;
    const { sudaderaId } = req.body;

    try {
        const compra = await Compra.findOne({ user: userId });

        if (compra) {
            compra.items = compra.items.filter(
                (item) => !item.item.equals(sudaderaId)
            );
            await compra.save();
            res.status(200).json(compra);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        Logger.error("Error al eliminar item del carrito: ", error);
        res.status(500).json({ message: "Error al eliminar item del carrito" });
    }
}

// Este conjunto de controladores asume que tienes un sistema de logeo y que el `userId` se obtiene de alguna manera a través del request, ya sea como parte del cuerpo del request, parámetros de la URL, o tokens de autenticación. Ajusta según sea necesario para tu implementación específica.

export async function finalizarCompra(req, res) {
    const { userId } = req.body;

    try {
        const compra = await Compra.findOne({ user: userId });
        if (!compra || compra.items.length === 0) {
            return res
                .status(400)
                .json({ message: "No hay items en el carrito para comprar." });
        }

        // Calcula el precio total de la compra
        let precioTotal = 0;
        for (const item of compra.items) {
            const sudadera = await Sudadera.findById(item.item);
            if (!sudadera || sudadera.stock < item.cantidad) {
                return res.status(400).json({
                    message: `Stock insuficiente para el producto ${sudadera.nombre}.`,
                });
            }

            // Reduce el stock de la sudadera
            sudadera.stock -= item.cantidad;
            await sudadera.save();

            // Actualiza el precio total
            precioTotal += item.cantidad * sudadera.precio;
        }

        // Actualiza el precioTotal en el documento de compra
        compra.precioTotal = precioTotal;
        await compra.save();

        res.status(200).json(compra);
    } catch (error) {
        Logger.error("Error al finalizar la compra: ", error);
        res.status(500).json({
            message: "Error al finalizar la compra",
            error,
        });
    }
}

export async function obtenerComprasUsuario(req, res) {
    const { userId } = req.params; // Asume que el ID del usuario se pasa como parámetro de URL

    try {
        const compras = await Compra.find({ user: userId }).populate(
            "items.item"
        );
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las compras del usuario",
            error,
        });
    }
}

export async function modificarCompra(req, res) {
    const { compraId, nuevoEstado } = req.body; // Ejemplo de parámetros esperados

    try {
        const compra = await Compra.findByIdAndUpdate(
            compraId,
            { estado: nuevoEstado },
            { new: true }
        );
        if (!compra) {
            return res.status(404).json({ message: "Compra no encontrada." });
        }

        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({
            message: "Error al modificar la compra",
            error,
        });
    }
}
export async function eliminarCompra(req, res) {
    const { compraId } = req.params; // Asume que el ID de la compra se pasa como parámetro de URL

    try {
        const compra = await Compra.findByIdAndDelete(compraId);
        if (!compra) {
            return res.status(404).json({ message: "Compra no encontrada." });
        }

        res.status(200).json({ message: "Compra eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la compra", error });
    }
}
