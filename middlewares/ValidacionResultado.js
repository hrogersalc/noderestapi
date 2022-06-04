import { validationResult } from "express-validator";

export const validacionResultado = (req, res, next) => {
    // validar las condiciones del request indicadas en las rutas
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    // si todo va bien continuar con el siguiente middleware dentro del pipepline del request
    next();
};