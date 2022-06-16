import axios from "axios";
import { body, param, validationResult } from "express-validator";

export const validacionResultado = (req, res, next) => {
    // validar las condiciones del request indicadas en las rutas
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    // si todo va bien continuar con el siguiente middleware dentro del pipepline del request
    next();
};

export const bodyRegistrarValidador = [
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
            }
        ),
    validacionResultado
];

export const bodyLoginValidador = [
    body('email', "Correo electronico no es valido")
            .trim()
            .isEmail()
            .normalizeEmail(),
    validacionResultado
];

export const bodyEnlaceValidador = [
    body("enlaceLargo", "formato de enlace incorrecto")
        .trim()
        .notEmpty()
        .custom(async (valor) => {
            try {
                await axios.get(valor)
                // retornar true para indicar que todo fue correcto
                //  se puede retornar false para indicar que la validacion fallo
                return true;
            } catch (error) {
                console.log(error);
                // hacer un throw new Error para indicar que fallo la validacion
                throw new Error("enlace ingresado no existe");
            }
        }),
    validacionResultado
];

export const paramsEnlaceValidador = [
    param("id", "formato de enlace incorreto")
        .trim()
        .notEmpty()
        .escape(),  // sirve para escapar los valores enviados (en este caso por los params) tales como <script></script>
    validacionResultado
];