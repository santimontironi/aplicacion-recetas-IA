import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const generateRecipeAI = async (ingredients) => {
  const prompt = `
    Sos un chef profesional, crea recetas de comidas argentinas usando los siguientes ingredientes:
    ${ingredients.join(", ")}.

    Retorna la receta UNICAMENTE en formato JSON, como el siguiente ejemplo:

    {
      recipeName: '',
      ingredients: [],
      preparation: '',
      time: '',
      difficulty: ''
    }
    
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const response = completion.choices[0].message.content; //se retorna la respuesta del agente
  
  return JSON.parse(response);
};