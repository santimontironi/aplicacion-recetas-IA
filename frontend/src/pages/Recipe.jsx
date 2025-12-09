import { useContext } from "react"
import { RecipeByIdContext } from "../context/RecipeById"
import Loader from "../components/Loader"
import Back from "../components/Back"

const Recipe = () => {

  const { recipe, loadingGetRecipe } = useContext(RecipeByIdContext)

  return (
    <section className="w-full min-h-screen flex justify-center items-start bg-linear-90 from-[#8a00c4] to-[#65028f] ">
      <Back url={'/inicio'} />
      {loadingGetRecipe ? (
        <Loader />
      ) : (
        <div className="w-[330px] md:w-[600px] xl:w-[1000px] 2xl:w-[1200px] bg-white shadow-[10px_10px_20px_5px_rgba(0,0,0,0.6)] rounded-2xl p-8 sm:p-10 mt-8 border-4 border-[#1ca175] hover:bg-[#ececec]">

          <h2 className="text-4xl font-extrabold text-[#235c49] mb-4">
            {recipe.recipeName}
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Creada el:{" "}
            <span className="font-medium text-gray-700">
              {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          </p>

          <div className="mb-8">
            <span className="px-4 py-2 bg-[#235c49] text-white rounded-full text-sm font-semibold shadow-md">
              Dificultad: {recipe.difficulty}
            </span>
          </div>

          {recipe.description && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#8a00c4] mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {recipe.description}
              </p>
            </div>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#8a00c4] mb-2">Ingredientes</h3>
              <ul className="list-disc ml-6 text-gray-700 text-lg space-y-1">
                {recipe.ingredients.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.preparation && recipe.preparation.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-[#8a00c4] mb-2">Pasos</h3>
              <ol className="list-decimal ml-6 text-gray-700 text-lg space-y-2">
                {recipe.preparation.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Recipe