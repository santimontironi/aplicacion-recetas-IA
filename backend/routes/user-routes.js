import { loginUser, registerUser } from "../controllers/user-controller.js";
import { Router } from "express";

export const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);