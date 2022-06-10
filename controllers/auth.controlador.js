import {Usuario} from '../models/Usuario.js';

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

        return res.status(201).json({ok: true});
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

        return res.json({ok: 'login'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error de servidor"});
    }
};