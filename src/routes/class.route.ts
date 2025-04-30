import { Router } from "express";
import { MAuthUser } from "../middleware/auth.middleware";
import {
  CAddClass,
  CGetAllClasses,
  CGetClassById,
} from "../controller/class.controller";

const router = Router();

router.post("/", MAuthUser(), CAddClass);

router.get("/", MAuthUser(), CGetAllClasses);

router.get("/:id", MAuthUser(), CGetClassById);

export default router;
