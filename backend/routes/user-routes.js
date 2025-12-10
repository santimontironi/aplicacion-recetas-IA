import { loginUser, registerUser, dashboardUser, logoutUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { Router } from "express";

export const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/dashboard", verifyToken, dashboardUser);
router.post("/logout", verifyToken, logoutUser);