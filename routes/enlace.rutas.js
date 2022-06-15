import { Router } from 'express';
import { buscarEnlacePorID, crearEnlace, eliminarEnlacePorID, listarEnlaces } from '../controllers/enlaces.controlador.js';
import { requiereToken } from '../middlewares/tokenManager.js';
import { bodyEnlaceCrearValidador, paramsEnlaceValidador } from '../middlewares/validadorManager.js';

const router = Router();

router.get("/", requiereToken, listarEnlaces);
router.get("/:id", requiereToken, buscarEnlacePorID);
router.post("/", requiereToken, bodyEnlaceCrearValidador, crearEnlace);
router.delete("/:id", requiereToken, paramsEnlaceValidador, eliminarEnlacePorID);

export default router;