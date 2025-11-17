import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token.js";
import { addRecipe, allRecipes, deleteRecipe } from "../controllers/recipe-controller.js";

export const router = Router()

router.post('/addRecipe', verifyToken, addRecipe)
router.get('/allRecipes', verifyToken, allRecipes)
router.post('/deleteRecipe/:id', verifyToken, deleteRecipe)