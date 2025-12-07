import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const generateRecipeAI = async (ingredients) => {
  const prompt = `
    Sos un chef profesional. Generá una receta ARGENTINA usando estos ingredientes:
    ${ingredients.join(", ")}.

    IMPORTANTE:
    - Creá una receta completamente distinta cada vez, aunque los ingredientes se repitan.
    - Variá el nombre, los pasos, los tiempos y la dificultad.
    - NO repitas recetas previas.

    Retorná SOLO JSON:
    {
      "recipeName": "",
      "ingredients": [],
      "preparation": [],
      "time": "",
      "difficulty": ""
    }
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let response = completion.choices[0].message.content;

  // Limpiar la respuesta de bloques de código markdown
  response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  return JSON.parse(response);
};