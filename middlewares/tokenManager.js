import jwt from 'jsonwebtoken';
import { tokenErrores } from '../utils/generarToken.js';

export const requiereToken = (req, res, next) => {
    try {
        const bearerToken = req.headers?.authorization;
        if(!bearerToken) {
            throw new Error("No Bearer");
        }

        const token = bearerToken.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.CLAVE_SECRETA_JWT)

        req.uid = uid;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({error: tokenErrores[error.message]});
    }
};