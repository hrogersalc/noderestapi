import { Router } from 'express';
import { actualizarEnlace, buscarEnlacePorEnlaceCorto, crearEnlace, eliminarEnlace, listarEnlaces } from '../controllers/enlaces.controlador.js';
import { requiereToken } from '../middlewares/tokenManager.js';
import { bodyEnlaceValidador, paramsEnlaceValidador } from '../middlewares/validadorManager.js';

const router = Router();

router.get("/", requiereToken, listarEnlaces);
router.get("/:enlaceCorto", buscarEnlacePorEnlaceCorto);
router.post("/", requiereToken, bodyEnlaceValidador, crearEnlace);
router.delete("/:id", requiereToken, paramsEnlaceValidador, eliminarEnlace);
router.patch("/:id", requiereToken, paramsEnlaceValidador, bodyEnlaceValidador, actualizarEnlace);

export default router;