import jwt from 'jsonwebtoken';

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
        const tokenErrores = {
            "invalid signature": "La firma dek token no es válida",
            "jwt expired": "El token ha expirado",
            "invalid token": "El token no es válido",
            "No Bearer": "El token no existe",
            "jwt malformed": "Token mal formado"
        };
        return res.status(401).send({error: tokenErrores[error.message]});
    }
};