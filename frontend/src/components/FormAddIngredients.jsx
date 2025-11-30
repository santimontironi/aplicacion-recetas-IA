import { useState } from "react"

const FormAddIngredients = ({ submitForm }) => {

  const [ingredients, setIngredients] = useState([""])

  function handleChange(value, index) {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  function deleteInput(index) {
    setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitForm({ingredients})
    setIngredients([""])
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {ingredients.map((ing, index) => (
        <div key={index}>
          <input onChange={(e) => handleChange(e.target.value.trim(), index)} value={ing} type="text" placeholder={`Ingrediente ${index + 1}`} />

          {ingredients.length > 1 && (
            <button type="button" onClick={() => deleteInput(index)}>Eliminar</button>
          )}
        </div>
      ))}



      <button type="submit">Agregar ingredientes</button>

      <button type="button" onClick={() => setIngredients([...ingredients, ""])}>Nuevo ingrediente</button>
    </form>
  )
}

export default FormAddIngredients