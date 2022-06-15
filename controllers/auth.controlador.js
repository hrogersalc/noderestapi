import {Usuario} from '../models/Usuario.js';
import { generarRefreshToken, generarToken } from '../utils/generarToken.js';

export const registrar = async (req, res) => {
    const {email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            throw {code: 11000};
        }

        usuario = new Usuario({email, password});
        await usuario.save();

        // generar el token JWT
        const {token, expiracionToken} = generarToken(usuario.id);
        // generar el refresh token e incluirlo dentro de una cookie
        generarRefreshToken(usuario.id, res);

        return res.status(201).json({token, expiracionToken});
    } catch (error) {
        console.log(error);
        console.log(error.code);
        if (error.code === 11000) {
            return res.status(400).json({error: "Ya existe el usuario"});
        }
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(403).json({error: "No existe este usuario"});
        }
        const resultado = await usuario.compararPasswords(password);
        if (!resultado) {
            return res.status(403).json({error: "Contraseña incorrecta"});
        }

        // generar el token JWT
        const {token, expiracionToken} = generarToken(usuario.id);
        // generar el refresh token e incluirlo dentro de una cookie
        generarRefreshToken(usuario.id, res);

        return res.json({token, expiracionToken});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const infoUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.uid).lean();
        console.log(usuario);
        const resultado = {email: usuario.email, uid: usuario._id};
        console.log(resultado);
        return res.json(resultado);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export const refreshToken = (req, res) => {
    try {
        const {token, expiracionToken} = generarToken(req.uid);
        return res.json({token, expiracionToken});        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ok: true});
};