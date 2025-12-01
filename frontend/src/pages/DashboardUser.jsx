import SideDashboard from "../components/SideDashboard"
import { useContext, useState } from "react"
import { RecipesContext } from "../context/RecipesContext"
import FormAddIngredients from "../components/FormAddIngredients"
import RecipeGenerated from "../components/RecipeGenerated"
import Loader from "../components/Loader"

const DashboardUser = () => {

  const { newRecipe, loadingAddRecipe } = useContext(RecipesContext)
  const [recipeGenerated, setRecipeGenerated] = useState(null)

  async function handleGenerateRecipe(ingredients) {
    try {
      const recipe = await newRecipe(ingredients)
      setRecipeGenerated(recipe)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="h-screen w-full containerDashboard flex justify-around items-center">
      <div className="xl:w-[1000px] 2xl:w-[1300px] xl:h-[600px] 2xl:h-[700px] bg-[#8a00c4] bg-opacity-80 p-5 rounded-lg shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)]">
        <div className="flex xl:flex-row xl:justify-between">
          <div>
            <FormAddIngredients submitForm={handleGenerateRecipe} />
            {loadingAddRecipe && recipeGenerated ? <div><Loader /></div> :
              <RecipeGenerated recipe={recipeGenerated} />}
          </div>
          <SideDashboard />
        </div>

      </div>
    </section>
  )
}

export default DashboardUser