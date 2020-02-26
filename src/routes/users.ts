import { Router } from "express";
var router = Router();
import { register, login, getProfile } from "../controllers/userController";

router.get("profile/:id", getProfile);

router.post("/login", login);

router.post("/register", register);

export default router;
