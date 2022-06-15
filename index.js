import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './database/conexiondb.js';
import authRutas from './routes/auth.rutas.js';
import enlaceRutas from './routes/enlace.rutas.js'

const app = express();

// habilitar la recepcion de salicitudes con parametros tipo JSON en el body
app.use(express.json());
// habilitar el uso de cookies
app.use(cookieParser());

// configurar la url que se usara para un determinada ruta
app.use('/api/v1/auth', authRutas);
app.use('/api/v1/enlaces', enlaceRutas);

const puerto = process.env.PORT || 5000;
app.listen(puerto, () => console.log('😊😊😊 http://localhost:5000'));