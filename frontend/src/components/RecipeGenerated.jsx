const RecipeGenerated = ({recipe}) => {
  return (
    <div>
      {recipe && (
        <div className="mt-6 bg-white p-5 rounded-lg xl:w-[600px] 2xl:w-[800px]">
          <h2 className="text-2xl font-bold mb-4">Receta Generada:</h2>
          <h3 className="text-lg">{recipe.recipeName}</h3>
          <h4 className="font-semibold mt-4">Ingredientes:</h4>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
          <h4>Preparacion:</h4>
          <ol className="list-decimal list-inside"></ol>
            {recipe.preparation.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          <p><strong>Tiempo:</strong> {recipe.time}</p>
          <p><strong>Dificultad:</strong> {recipe.difficulty}</p>
        </div>
      )}
    </div>
  )
}

export default RecipeGenerated