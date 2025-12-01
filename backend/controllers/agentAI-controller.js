import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const generateRecipeAI = async (ingredients) => {
  const prompt = `
    Sos un chef profesional, crea recetas de comidas argentinas usando los siguientes ingredientes:
    ${ingredients.join(", ")}.

    Retorna la receta UNICAMENTE en formato JSON válido, sin bloques de código markdown.
    Usa exactamente esta estructura:

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