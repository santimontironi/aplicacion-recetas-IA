import { useState } from "react"

const FormAddIngredients = ({ submitForm }) => {

  const [ingredients, setIngredients] = useState([""])
  const [incompletedIngredients, setIncompletedIngredients] = useState(false)

  function handleChange(value, index) {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  function deleteInput(index) {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (ingredients.some(ing => ing.trim() === "")) {
      setIncompletedIngredients(true)
      return
    }
    submitForm({ ingredients })
    setIncompletedIngredients(false)
    setIngredients([""])
  }

  return (
    <form className="p-7 bg-[#43035f] overflow-y-auto min-h-[200px] shadow-[8px_8px_15px_5px_rgba(0,0,0,0.6)]" method="post" onSubmit={handleSubmit}>
      {ingredients.map((ing, index) => (
        <div className="flex flex-row items-center gap-3 mb-6" key={index}>
          <input className="bg-white xl:w-[400px] 2xl:w-[500px] p-3 rounded-lg focus:outline-2 focus:outline-[#14d876]" onChange={(e) => handleChange(e.target.value, index)} value={ing} type="text" placeholder={`Ingrediente ${index + 1}`} />

          {ingredients.length > 1 && (
            <button className="bg-red-600 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700 w-30 h-10" type="button" onClick={() => deleteInput(index)}><i className="bi bi-trash"></i></button>
          )}

        </div>
      ))}

      {incompletedIngredients && (
        <p className="bg-red-500 text-center text-white w-[260px] p-1 rounded-lg md:w-[300px] md:p-2 2xl:w-[400px] mx-auto mb-5">Todos los campos son obligatorios</p>
      )}

      <div className="flex flex-row items-center gap-3">
        <button className="bg-[#8a00c4] p-1 text-[14px] md:p-3 md:text-[16px] xl:text-[18px] 2xl:text-[20px] rounded-lg text-white cursor-pointer hover:bg-[#9e2fce]" type="button" onClick={() => setIngredients([...ingredients, ""])}>Nuevo ingrediente</button>
        
        <button className="bg-[#41c398] p-1 text-[14px] md:p-3 md:text-[16px] xl:text-[18px] 2xl:text-[20px] rounded-lg text-white cursor-pointer hover:bg-[#38ac85]" type="submit">Agregar ingredientes</button>
      </div>

    </form>
  )
}

export default FormAddIngredients