import { Link } from "react-router-dom"

const RecipeList = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className="mb-3 flex flex-col bg-[#235c49] p-3 rounded-lg cursor-pointer hover:bg-[#32aa82] hover:shadow-[4px_4px_10px_2px_rgba(0,0,0,0.6)]">
        <h3>{recipe.recipeName}</h3>
        <span className="text-[#ecececec] font-extralight">{recipe.date}</span>
      </div>
    </Link>
  )
}

export default RecipeList