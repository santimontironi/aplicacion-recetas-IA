import { createContext } from "react";
import { recipeByIdAxios } from "../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const RecipeByIdContext = createContext();

export const RecipeByIdProvider = ({children}) => {

    const[recipe,setRecipe] = useState([])
    const[loadingGetRecipe,setLoadingGetRecipe] = useState(true)

    const params = useParams()

    const {id} = params

    useEffect(() => {
        async function getRecipe(){
            try{
                const res = await recipeByIdAxios(id)
                setRecipe(res.data.recipe)
                return res.data
            }
            catch(error){

            }
            finally{
                setTimeout(() => {
                    setLoadingGetRecipe(false)
                },1500)
            }
        }
        getRecipe()
    },[])

    return (
        <RecipeByIdContext.Provider value={{recipe,loadingGetRecipe}}>
            {children}
        </RecipeByIdContext.Provider>
    )
}