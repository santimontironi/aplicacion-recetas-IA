import { createContext, useState, useEffect } from "react";
import { addRecipe, getAllRecipes } from "../api/api";

export const RecipeContext = createContext();

export const RecipeProvider = () => {

    const[loadingAddRecipe, setLoadingAddRecipe] = useState(false)
    const[loadingAllRecipes, setLoadingAllRecipes] = useState(false)
    const[recipe,setRecipe] = useState([])

    async function newRecipe(dataRecipe) {
        setLoadingAddRecipe(true)
        try{
            const res = await addRecipe(dataRecipe)
            if(res.data.recipe){
                setRecipe((prev) => [...prev, res.data.recipe])
            }
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

    useEffect(() => {
        async function allRecipes(){
            setLoadingAllRecipes(true)
            try{
                const res = await getAllRecipes()
                setRecipe(res.data.recipes)
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


    return <RecipeContext.Provider value={{addRecipe,loadingAddRecipe,recipe,newRecipe,loadingAllRecipes}}>

    </RecipeContext.Provider>
}