import { generateRecipeAI } from "./agentAI-controller.js";
import Recipe from "../models/recipe-model.js";

export const addRecipe = async (req, res) => {
    try {
        const { ingredients } = req.body;
        const recipe = await generateRecipeAI(ingredients);

        await Recipe.create({
            ...recipe,
            user: req.user.id
        });

        res.status(200).json({ message: 'Receta agregada correctamente', newRecipe: recipe });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al agregar la receta', error: error.message });
    }
}

export const allRecipes = async (req,res) => {
    try{
        const userId = req.user.id

        const recipes = await Recipe.find({ user: userId, active: true }).sort({ date: -1 }); //se consulta por las recetas en orden descendente

        res.status(200).json({ recipes });
    }
    catch(error){
        res.status(500).json({message: 'Error al obtener las recetas', error: error.message});
    }
}

export const deleteRecipe = async (req,res) => {
    try{
        const recipeId = req.params.id;

        await Recipe.findByIdAndUpdate(recipeId, { active: false });

        res.status(200).json({ message: 'Receta eliminada correctamente' });
    }
    catch(error){
        res.status(500).json({message: 'Error al eliminar la receta', error: error.message});
    }
}

export const recipeById = async (req,res) => {
    try{
        const idRecipe = req.params.id;

        const recipe = await Recipe.findById(idRecipe);

        res.status(200).json({ recipe });
    }
    catch(error){
        res.status(500).json({message: 'Error al obtener la receta', error: error.message});
    }
}




