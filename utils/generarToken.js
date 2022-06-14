import jwt from 'jsonwebtoken';

export const generarToken = (uid) => {
    const expiracionToken = Number(process.env.EXPIRACION_JWT);
    try {
        const token = jwt.sign({uid}, process.env.CLAVE_SECRETA_JWT, {expiresIn: expiracionToken});
        return {token, expiracionToken};
    } catch (error) {
        console.error(error);
    }
};

export const generarRefreshToken = (uid, res) => {
    const expiracionRefreshToken = Number(process.env.EXPIRACION_REFRESH_JWT);
    try {
        const refreshToken = jwt.sign({uid}, process.env.CLAVE_REFRESH_JWT, {expiresIn: expiracionRefreshToken});
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiracionRefreshToken * 1000)   // multiplicar debido a que esta en milisegundos
        });
    } catch (error) {
        console.log(error);
    }
};