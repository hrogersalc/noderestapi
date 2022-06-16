import { nanoid } from "nanoid";
import { Enlace } from "../models/Enlace.js";

export const listarEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlace.find({uid: req.uid})
        return res.json({enlaces});
    } catch (error) {
         console.log(error);
         return res.status(500).json({error: "error de servidor"});
    }
};

export const buscarEnlacePorEnlaceCorto = async (req, res) => {
    try {
        // deconstruyendo params para obtener el enlaceCorto
        const {enlaceCorto} = req.params;
        const enlace = await Enlace.findOne({enlaceCorto});
        if (!enlace) {
            return res.status(404).json({error: "No existe el enlace corto solicitado"});
        }
        return res.json({enlaceLargo: enlace.enlaceLargo});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error de servidor"});
    }
};

export const buscarEnlacePorId = async (req, res) => {
    try {
        // deconstruyendo params para obtener el id
        const {id} = req.params;
        const enlace = await Enlace.findById(id);
        if (!enlace) {
            return res.status(404).json({error: "No existe un enlace con el ID indicado"});
        }
        if (!enlace.uid.equals(req.uid)) {
            return res.status(401).json({error: "No se posible consultar el enlace con el ID indicado"});
        }
        return res.json({enlace});
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({error: "Formato de ID incorrecto"});
        }
        return res.status(500).json({error: "error de servidor"});
    }
};

export const crearEnlace = async (req, res) => {
    try {
        const {enlaceLargo} = req.body;
        const enlace = new Enlace({enlaceLargo, enlaceCorto: nanoid(6), uid: req.uid})
        const nuevoEnlace = await enlace.save();
        return res.status(201).json({nuevoEnlace});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error de servidor"});
    }
};

export const eliminarEnlace = async (req, res) => {
    try {
        // deconstruyendo params para obtener el id
        const {id} = req.params;
        const enlace = await Enlace.findById(id);
        if (!enlace) {
            return res.status(404).json({error: "No existe un enlace con el ID indicado"});
        }
        if (!enlace.uid.equals(req.uid)) {
            return res.status(401).json({error: "No se posible eliminar el enlace con el ID indicado"});
        }
        await enlace.remove();
        return res.json({enlace});
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({error: "Formato de ID incorrecto"});
        }
        return res.status(500).json({error: "error de servidor"});
    }
};

export const actualizarEnlace = async (req, res) => {
    try {
        // deconstruyendo params para obtener el id
        const {id} = req.params;
        const {enlaceLargo} = req.body;

        const enlace = await Enlace.findById(id);
        if (!enlace) {
            return res.status(404).json({error: "No existe un enlace con el ID indicado"});
        }
        if (!enlace.uid.equals(req.uid)) {
            return res.status(401).json({error: "No se posible actualizar el enlace con el ID indicado"});
        }

        enlace.enlaceLargo = enlaceLargo;
        await enlace.save();

        return res.json({enlace});
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({error: "Formato de ID incorrecto"});
        }
        return res.status(500).json({error: "error de servidor"});
    }
};
