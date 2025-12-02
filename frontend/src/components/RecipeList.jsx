import { Link } from "react-router-dom"

const RecipeList = ({ recipe, handleDelete }) => {
  return (
    <div className="relative mb-3 flex flex-col bg-[#235c49] p-3 rounded-lg cursor-pointer hover:bg-[#32aa82] hover:shadow-[4px_4px_10px_2px_rgba(0,0,0,0.6)]">
      <Link to={`/receta/${recipe._id}`}>
        <h3 className="font-bold">{recipe.recipeName}</h3>
        <span className="text-[#ecececec] font-extralight">{recipe.date}</span>
      </Link>
      <button className="absolute right-3 top-3 border-none bg-red-500 p-2 rounded-xl w-10 h-10 cursor-pointer hover:bg-red-600" onClick={() => handleDelete(recipe._id)}><i className="bi bi-trash"></i></button>
    </div>
  )
}

export default RecipeList