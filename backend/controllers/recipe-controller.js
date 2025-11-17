import { generateRecipeAI } from "./agentAI-controller.js";
import Recipe from "../models/recipe-model.js";

export const addRecipe = async (req, res) => {
    try {
        const { ingredients } = req.body;
        const recipe = await generateRecipeAI(ingredients);

        await Recipe.create(recipe);

        res.json({ recipe });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al agregar la receta', error: error.message });
    }
}