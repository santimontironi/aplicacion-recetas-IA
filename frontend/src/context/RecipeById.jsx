import { createContext } from "react";
import { Outlet } from "react-router-dom";
import { recipeByIdAxios } from "../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const RecipeByIdContext = createContext();

export const RecipeByIdProvider = () => {

    const[recipe,setRecipe] = useState([])
    const[loadingGetRecipe,setLoadingGetRecipe] = useState(null)

    const params = useParams()

    const {id} = params

    useEffect(() => {
        async function getRecipe(){
            setLoadingGetRecipe(true)
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
            <Outlet />
        </RecipeByIdContext.Provider>
    )
}