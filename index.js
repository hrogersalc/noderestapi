import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './database/conexiondb.js';
import cors from 'cors';

import authRutas from './routes/auth.rutas.js';
import enlaceRutas from './routes/enlace.rutas.js'
import redireccionRutas from './routes/redirecciones.rutas.js';

const app = express();

// configuracion de cors
// agregar a una lista los origenes que estan permitidos acceder
const originesPermitidosEnv = process.env.ORIGENES_PERMITIDOS;
const originesPermitidosListado = originesPermitidosEnv.length === 0 ? [] : originesPermitidosEnv.split(",");
app.use(
    cors({
        origin: function (origin, callback) {
            // si origin es undefined se trata del mismo servidor aceptar la solicitud Ó
            // si en el listado hay anotado origenes y el origin esta incluido aceptar la solicitud
            // si en el listado no hay origenes y el origin no es undefined rechazar la solicitud
            // -- -- -- -- --
            if (origin === undefined || (originesPermitidosListado.length > 0 && originesPermitidosListado.includes(origin))) {
                return callback(null, true);
            }
            return callback("Error de acceso CORS no autorizado: " + origin, false);
        },
        credentials: true,
    })
);

// habilitar la recepcion de salicitudes con parametros tipo JSON en el body
app.use(express.json());
// habilitar el uso de cookies
app.use(cookieParser());

// configurar la url que se usara para un determinada ruta
// ejemplo redireccion backend
app.use('/', redireccionRutas);
// 
app.use('/api/v1/auth', authRutas);
app.use('/api/v1/enlaces', enlaceRutas);

const puerto = process.env.PORT || 5000;
app.listen(puerto, () => console.log('😊😊😊 http://localhost:5000'));