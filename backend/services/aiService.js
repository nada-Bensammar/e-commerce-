import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getProductRecommendations(productName) {
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You're an expert product recommendation AI assistant.",
      },
      {
        role: "user",
        content: `Suggest similar or related products to "${productName}".`,
      },
    ],
  });

  return chat.choices[0].message.content;
}
