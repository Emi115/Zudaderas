import mongoose from "mongoose";
import Logger from "../utils/logger.js";
import Sudadera from "../models/Sudadera.js"; // Importa el modelo de Sudadera

// Función para crear una nueva sudadera
export async function createSudadera(req, res, next) {
    try {
        // Busca si ya existe una sudadera con el mismo nombre
        const existingSudadera = await Sudadera.findOne({
            nombre: req.body.nombre,
        });

        if (existingSudadera) {
            // Si ya existe una sudadera con el mismo nombre, devuelve un mensaje de error
            return res
                .status(400)
                .json({
                    message:
                        "Ya existe una sudadera con este nombre. Por favor, elija otro nombre.",
                });
        } else {
            // Si la sudadera no existe, crea una nueva instancia de Sudadera
            const sudadera = new Sudadera(req.body);

            // Registra en el log los datos recibidos
            Logger.warn(JSON.stringify(req.body));

            // Guarda la sudadera en la base de datos
            const createdSudadera = await sudadera.save();

            // Registra en el log la sudadera creada
            Logger.warn(JSON.stringify(createdSudadera));

            // Envía una respuesta con estado 201 (Created) y los datos de la sudadera creada
            return res.status(201).send(createdSudadera);
        }
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        next(error);
    }
}

// Función para actualizar una sudadera
export async function updateSudadera(req, res, next) {
    try {
        // Extrae el ID de la sudadera de los parámetros de la solicitud
        const { id } = req.params;

        // Busca la sudadera por ID
        const sudadera = await Sudadera.findById(id);

        // Si no se encuentra la sudadera, envía un mensaje de error
        if (!sudadera) {
            return res.status(404).send({ message: "Sudadera no encontrada." });
        }

        // Actualiza la sudadera con los datos enviados en el cuerpo de la solicitud
        Object.assign(sudadera, req.body);

        // Guarda la sudadera actualizada
        const updatedSudadera = await sudadera.save();

        // Envía la sudadera actualizada al cliente
        return res.status(200).send(updatedSudadera);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        next(error);
    }
}

// Función para eliminar una sudadera
export async function deleteSudadera(req, res, next) {
    try {
        // Extrae el ID de la sudadera de los parámetros de la solicitud
        const { id } = req.params;

        // Elimina la sudadera por ID y guarda el resultado
        const deletedSudadera = await Sudadera.findByIdAndDelete(id);

        // Si no se encuentra la sudadera, envía un mensaje de error
        if (!deletedSudadera) {
            return res.status(404).send({ message: "Sudadera no encontrada" });
        }

        // Envía la confirmación de la eliminación
        return res.status(200).send(deletedSudadera);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        next(error);
    }
}

// Función para buscar sudaderas basándose en criterios específicos
export async function searchSudaderas(req, res, next) {
    try {
        // Los criterios de búsqueda se reciben como parámetros de consulta
        const searchCriteria = req.query;

        // Busca sudaderas que coincidan con los criterios de búsqueda
        const results = await Sudadera.find(searchCriteria);

        // Envía los resultados al cliente
        return res.send(results);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        next(error);
    }
}

export async function getSudaderas(req, res, next) {
    try {
        let page = parseInt(req.query.page) || 1; // Asume la página 1 como predeterminada si no se especifica

        // Asegura que la página solicitada no sea menor que 1
        if (page < 1) {
            return res
                .status(400)
                .send({
                    message:
                        "La página solicitada no es válida. Por favor, selecciona una página mayor o igual a 1.",
                });
        }

        const pageSize = 8; // Define el tamaño de cada página de sudaderas

        // Calcula el número de documentos a omitir para la paginación
        const skip = (page - 1) * pageSize;

        // Obtiene el total de documentos para determinar si la página solicitada existe
        const total = await Sudadera.countDocuments();

        // Calcula el número total de páginas
        const totalPages = Math.ceil(total / pageSize);

        // Verifica si la página solicitada es mayor que el número total de páginas
        if (page > totalPages && totalPages > 0) {
            return res
                .status(404)
                .send({
                    message:
                        "No hay sudaderas en la página solicitada. Por favor, vuelve a una página anterior.",
                });
        }

        // Busca las sudaderas en la base de datos con paginación aplicada
        const results = await Sudadera.find().skip(skip).limit(pageSize);

        // Si no hay resultados y estamos en la página 1, podría ser que no hay sudaderas en absoluto
        if (results.length === 0 && page === 1) {
            return res.send({ message: "No hay sudaderas disponibles." });
        }

        // Envía los resultados y el total (útil para la paginación en el cliente) al cliente
        return res.send({
            total,
            totalPages,
            page,
            pageSize,
            data: results,
        });
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        next(error);
    }
}
