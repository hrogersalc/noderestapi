import jwt from 'jsonwebtoken';
import { tokenErrores } from "../utils/generarToken.js";

export const requiereRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) {
            throw new Error("No Bearer");
        }
        // verificamos ekl token de refresh y se obtien el uid
        const {uid} = jwt.verify(refreshTokenCookie, process.env.CLAVE_REFRESH_JWT);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: tokenErrores[error.message]});
    }
};