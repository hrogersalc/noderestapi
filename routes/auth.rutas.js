import express from "express";
import { login, registrar } from "../controllers/auth.controlador.js";
import { body } from 'express-validator';
import { validacionResultado } from "../middlewares/ValidacionResultado.js";

const router = express.Router();

router.post(
    // segmento de url
    '/registrar', [
        // validaciones agregadas al request en para los diferentes parametros a recibir
        body('email', "Correo electronico no es valido")
                .trim()
                .isEmail()
                .normalizeEmail(),
        body('password', 'Password debe ser minimo de 6 caracteres')
                .trim()
                .isLength({min: 6}),
        body('password', 'No coinciden el password con el de confirmacion')
                .custom((valor, {req}) => {
                    // valor = valor de la propiedad password
                    if (valor !== req.body.confirmarPassword) {
                        // ----
                        // se puede arrojar un error con su respectivo mensaje con lo que el mensaje indicado en body
                        //  no tomaria efecto o podria quitarse el mensaje del body y dejar solo el del throw
                        //throw new Error('No coinciden las contraseñas');
                        // ----
                        return false;
                    }
                    return true;
                })
    ],
    // ejecutar el middleware para validar las condiciones anteriores
    validacionResultado,
    // controlador a usar al coincidir el segmnento de la url
    registrar);

router.post(
    '/login', [
        body('email', "Correo electronico no es valido")
                .trim()
                .isEmail()
                .normalizeEmail()
    ],
    validacionResultado,
    login);

export default router;