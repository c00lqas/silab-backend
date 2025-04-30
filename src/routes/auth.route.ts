import { Router } from "express";
import { CUserLogin, CUserRegister } from "../controller/auth.controller";

const router = Router();

router.post("/login", CUserLogin);

router.post("/register", CUserRegister);

export default router;
