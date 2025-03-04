import { Router } from "express";
import { getAdmins } from "../users/user.controller.js";

const router = Router();

router.get("/admins", getAdmins);

export default router;