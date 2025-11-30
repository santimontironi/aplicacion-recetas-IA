const RecipeList = ({recipe}) => {
  return (
    <div>
        <h3>{recipe.recipeName}</h3>
        <span>{recipe.date}</span>
    </div>
  )
}

export default RecipeList