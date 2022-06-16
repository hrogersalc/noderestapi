import { Enlace } from "../models/Enlace.js";

export const redireccionEnlace = async (req, res) => {
    try {
        // deconstruyendo params para obtener el enlaceCorto
        const {enlaceCorto} = req.params;
        const enlace = await Enlace.findOne({enlaceCorto});
        if (!enlace) {
            return res.status(404).json({error: "No existe el enlace corto solicitado"});
        }
        return res.redirect(enlace.enlaceLargo);
    } catch (error) {
        console.log(error);
    }
};