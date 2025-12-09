import { useContext, useState } from "react"
import { RecipesContext } from "../context/RecipesContext"

const FormSearchRecipe = () => {

const { searchRecipes, noRecipes } = useContext(RecipesContext)
const [query, setQuery] = useState("")

function handleChange(value) {
    setQuery(value)
    searchRecipes(value)
}

return (
    <div className="flex justify-center my-6">
        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()} method="post">
            <input
                type="text"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Buscar receta..."
                className="w-full px-4 py-2 rounded-lg shadow-[3px_3px_10px_3px_rgba(0,0,0,0.6)] border border-white text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white"
            />
        </form>
    </div>
)

}

export default FormSearchRecipe