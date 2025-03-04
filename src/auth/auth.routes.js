import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post("/register",
     registerValidator, 
     validarCampos, 
     register
    );

router.post(
    "/login", 
    loginValidator, 
    validarCampos, 
    login
);

export default router;
