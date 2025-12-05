import { useContext } from "react"
import { RecipeByIdContext } from "../context/RecipeById"
import Loader from "../components/Loader"

const Recipe = () => {

  const {recipe,loadingGetRecipe} = useContext(RecipeByIdContext)

  return (
    <section>
      {loadingGetRecipe ? <Loader /> : (
        <div className="containerRecipeId mx-auto p-5">
          <h2 className="text-3xl font-bold mb-5">{recipe.title}</h2>
          
        </div>
      )}
    </section>
  )
}

export default Recipe