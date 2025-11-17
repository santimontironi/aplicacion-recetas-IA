import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const generateRecipeAI = async (ingredients) => {
  const prompt = `
    You are a professional chef. Create a complet recipe using:
    ${ingredients.join(", ")}.

    Return the recipe in the following format:

    {
      recipeName: '',
      ingredients: [],
      preparation: '',
      time: ''
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