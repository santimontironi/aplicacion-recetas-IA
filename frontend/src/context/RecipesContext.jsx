import { createContext, useState, useEffect } from "react";
import { addRecipeAxios, getAllRecipesAxios, deleteRecipeAxios } from "../api/api";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {

    const [loadingAddRecipe, setLoadingAddRecipe] = useState(false)
    const [loadingAllRecipes, setLoadingAllRecipes] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [recipesResults, setRecipesResults] = useState([])
    const [noRecipes, setNoRecipes] = useState(false)

    useEffect(() => {
        async function allRecipes() {
            try {
                const res = await getAllRecipesAxios()
                setRecipes(res.data.recipes)
            }
            catch (error) {
                console.log(error)
                throw error
            }
            finally {
                setTimeout(() => {
                    setLoadingAllRecipes(false)
                }, 1500)
            }
        }

        allRecipes()
    }, [])

    async function newRecipe(ingredients) {
        setLoadingAddRecipe(true)
        try {
            const res = await addRecipeAxios(ingredients)
            const recipeAdded = res.data.newRecipe
            setRecipes((prev) => [recipeAdded, ...prev])
            return recipeAdded
        }
        catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setTimeout(() => {
                setLoadingAddRecipe(false)
            }, 1500)
        }
    }

    async function deleteRecipeById(id) {
        try {
            await deleteRecipeAxios(id)
            const filteredRecipes = recipes.filter((recipe) => recipe._id !== id)
            setRecipes(filteredRecipes)
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    async function searchRecipes(query) {
        try {
            if (query === '') {
                setRecipesResults([])
                setNoRecipes(false)
                return
            }

            const recipeFiltered = recipes.filter((recipe) => recipe.recipeName.toLowerCase().includes(query.toLowerCase()))

            if(recipeFiltered.length === 0){
                setNoRecipes(true)
                return
            }

            setNoRecipes(false)
            setRecipesResults(recipeFiltered)

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    return <RecipesContext.Provider value={{ loadingAddRecipe, recipes, newRecipe, loadingAllRecipes, deleteRecipeById, searchRecipes, recipesResults, noRecipes }}>
        {children}
    </RecipesContext.Provider>
}