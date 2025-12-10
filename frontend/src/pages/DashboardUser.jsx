import SideDashboard from "../components/SideDashboard"
import { useContext } from "react"
import { RecipesContext } from "../context/RecipesContext"
import FormAddIngredients from "../components/FormAddIngredients"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const DashboardUser = () => {

  const { newRecipe, loadingAddRecipe } = useContext(RecipesContext)

  const navigate = useNavigate()

  async function handleGenerateRecipe(ingredients) {
    try {
      const recipe = await newRecipe(ingredients)
      navigate('/receta-generada', { state: { recipe } })
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="min-h-screen w-full containerDashboard flex justify-around items-center py-8 xl:py-0">
      <div className="xl:w-[1100px] md:w-[600px] 2xl:w-[1300px] xl:h-[700px] bg-[#8a00c4] bg-opacity-80 p-5 rounded-lg shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col xl:flex-row xl:justify-between w-[320px] xl:w-auto 2xl:max-h-[650px]">
          <div className="flex flex-col">
            <FormAddIngredients submitForm={handleGenerateRecipe} />
          </div>
          <SideDashboard />
        </div>

      </div>

      {loadingAddRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <Loader />
        </div>
      )}
    </section>
  )
}

export default DashboardUser