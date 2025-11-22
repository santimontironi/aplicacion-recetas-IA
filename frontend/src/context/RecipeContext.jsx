import { createContext, useState, useEffect } from "react";
import { addRecipe, getAllRecipes, deleteRecipe } from "../api/api";
import { Outlet } from "react-router-dom";

export const RecipeContext = createContext();

export const RecipeProvider = () => {

    const[loadingAddRecipe, setLoadingAddRecipe] = useState(false)
    const[loadingAllRecipes, setLoadingAllRecipes] = useState(false)
    const[recipes,setRecipes] = useState([])

    useEffect(() => {
        async function allRecipes(){
            setLoadingAllRecipes(true)
            try{
                const res = await getAllRecipes()
                setRecipes(res.data.recipes)
            }
            catch(error){
                console.log(error)
                throw error
            }
            finally{
                setTimeout(() => {
                    setLoadingAllRecipes(false)
                },1500)
            }
        }

        allRecipes()
    },[])

    async function newRecipe(dataRecipe) {
        setLoadingAddRecipe(true)
        try{
            const res = await addRecipe(dataRecipe)
            const recipeAdded = res.data.recipe
            setRecipes((prev) => [...prev, recipeAdded])
        }
        catch(error){
            console.log(error)
            throw error
        }
        finally{
            setTimeout(() => {
                setLoadingAddRecipe(false)
            },1500)
        }
    }

    async function deleteRecipeById(id){
        try{
            await deleteRecipe(id)
            const filteredRecipes = recipes.filter((recipe) => recipe._id !== id)
            setRecipes(filteredRecipes)
        }
        catch(error){
            console.log(error)
            throw error
        }
    }

    return <RecipeContext.Provider value={{addRecipe,loadingAddRecipe,recipes,newRecipe,loadingAllRecipes,deleteRecipeById}}>
        <Outlet />
    </RecipeContext.Provider>
}