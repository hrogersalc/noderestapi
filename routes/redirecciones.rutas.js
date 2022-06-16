import { Router } from "express";
import { redireccionEnlace } from "../controllers/redirecciones.controlador.js";
const router = Router();

router.get("/:enlaceCorto", redireccionEnlace);

export default router;