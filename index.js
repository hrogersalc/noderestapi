import 'dotenv/config';
import express from 'express';
import './database/conexiondb.js';
import authRutas from './routes/auth.rutas.js';
import cookieParser from 'cookie-parser';

const app = express();

// habilitar la recepcion de salicitudes con parametros tipo JSON en el body
app.use(express.json());
// habilitar el uso de cookies
app.use(cookieParser());

// configurar la url que se usara para un determinada ruta
app.use('/api/v1/auth', authRutas);

const puerto = process.env.PORT || 5000;
app.listen(puerto, () => console.log('😊😊😊 http://localhost:5000'));