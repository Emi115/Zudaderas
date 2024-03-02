// seguridad-middleware.js

import jwt from "jsonwebtoken";
import config from "../config.js";

// Definir la función de middleware de autorización
export function authorize(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token de autorización no proporcionado" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Malformatted token" });
    }

    // Verificar y decodificar el token
    jwt.verify(token, config.app.secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token de autorización inválido" });
        } else {
            // Verificar el rol del usuario
            if (decoded.role !== "admin") {
                return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta" });
            } else {
                // Si el usuario tiene el rol de 'admin', permite continuar con la solicitud
                next();
            }
        }
    });
}
