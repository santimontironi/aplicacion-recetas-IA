import { createContext, useState, useEffect } from "react";
import { addRecipeAxios, getAllRecipesAxios, deleteRecipeAxios } from "../api/api";
import { Outlet } from "react-router-dom";

export const RecipesContext = createContext();

export const RecipesProvider = () => {

    const [loadingAddRecipe, setLoadingAddRecipe] = useState(false)
    const [loadingAllRecipes, setLoadingAllRecipes] = useState(false)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function allRecipes() {
            setLoadingAllRecipes(true)
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

    async function newRecipe(dataRecipe) {
        setLoadingAddRecipe(true)
        try {
            const res = await addRecipeAxios(dataRecipe)
            const recipeAdded = res.data.recipe
            setRecipes((prev) => [...prev, recipeAdded])
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

    return <RecipesContext.Provider value={{ addRecipe, loadingAddRecipe, recipes, newRecipe, loadingAllRecipes, deleteRecipeById }}>
        <Outlet />
    </RecipesContext.Provider>
}