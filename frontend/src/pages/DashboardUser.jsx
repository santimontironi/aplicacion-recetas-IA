import SideDashboard from "../components/SideDashboard"
import { useContext } from "react"
import { RecipesContext } from "../context/RecipesContext"
import FormAddIngredients from "../components/FormAddIngredients"

const DashboardUser = () => {

  const {newRecipe} = useContext(RecipesContext)

  return (
    <section className="h-screen w-full containerDashboard flex justify-around items-center">
      <div className="xl:w-[1000px] 2xl:w-[1300px] xl:h-[600px] 2xl:h-[700px] flex justify-between bg-[#8a00c4] bg-opacity-80 p-5 rounded-lg shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)]">
        <div>
          <FormAddIngredients submitForm={newRecipe} />
        </div>
        <SideDashboard  />
        
      </div>
    </section>
  )
}

export default DashboardUser