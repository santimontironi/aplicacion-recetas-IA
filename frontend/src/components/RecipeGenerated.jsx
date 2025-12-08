import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { RecipesContext } from "../context/RecipesContext"
import Swal from "sweetalert2";

const RecipeGenerated = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const recipe = location.state?.recipe

  if (!recipe) {
    navigate('/dashboard')
    return null
  }

  const { newRecipe } = useContext(RecipesContext)

  const ingredients = recipe.ingredients

  async function handleNewGeneration() {
    try {
      const result = await Swal.fire({
        title: "¿Regenerar receta?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, regenerar",
        cancelButtonText: "Cancelar"
      });

      if (result.isConfirmed) {
        const newRecipeGenerated = await newRecipe({ ingredients });

        navigate('/receta-generada', { state: { recipe: newRecipeGenerated } })

        Swal.fire({
          title: "Regenerada",
          text: "La receta fue regenerada con éxito",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo regenerar la receta",
        icon: "error"
      });
    }
  }

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-[#43035f] to-[#8a00c4] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <button
          onClick={() => navigate('/inicio')}
          className="cursor-pointer mb-4 bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          ← Volver al Dashboard
        </button>

        <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-xl shadow-2xl border border-gray-200">

          <h2 className="text-4xl font-bold mb-3 text-[#8a00c4] border-b-2 border-[#41c398] pb-3">
            Receta Generada
          </h2>

          <h3 className="text-3xl font-semibold text-gray-800 mt-6 mb-6">
            {recipe.recipeName}
          </h3>

          <div className="bg-purple-50 p-6 rounded-lg mb-6 border-l-4 border-[#8a00c4]">
            <h4 className="font-bold text-xl text-[#8a00c4] mb-3 flex items-center gap-2">
              🥘 Ingredientes:
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="ml-2">{ing}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#b2f1dc] p-6 rounded-lg mb-6 border-l-4 border-[#41c398]">
            <h4 className="font-bold text-xl text-black mb-3 flex items-center gap-2">
              👨‍🍳 Preparación:
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
              {recipe.preparation.map((step, index) => (
                <li key={index} className="ml-2 leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex gap-6 mt-6 pt-6 border-t border-gray-300">
            <p className="bg-blue-100 px-6 py-3 rounded-full text-base font-semibold text-blue-800">
              ⏱️ {recipe.time}
            </p>
            <p className="bg-orange-100 px-6 py-3 rounded-full text-base font-semibold text-orange-800">
              📊 {recipe.difficulty}
            </p>
          </div>

          <div className="mt-8 flex gap-4 justify-center items-center mx-auto text-center">
            <button
              onClick={handleNewGeneration}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-lg cursor-pointer"
            >
              🔄 Generar Otra Receta
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecipeGenerated