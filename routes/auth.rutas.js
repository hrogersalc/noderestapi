import { Router } from "express";
import { infoUsuario, login, registrar, refreshToken, logout } from "../controllers/auth.controlador.js";
import { requiereToken } from "../middlewares/tokenManager.js";
import { requiereRefreshToken } from "../middlewares/requiereRefreshToken.js";
import { bodyLoginValidador, bodyRegistrarValidador } from "../middlewares/validadorManager.js";

const router = Router();


router.post('/registrar', bodyRegistrarValidador, registrar);

router.post('/login', bodyLoginValidador ,login);

router.get("/refresh", requiereRefreshToken, refreshToken);

router.get("/logout", logout);

router.get("/protejido", requiereToken, infoUsuario);

export default router;