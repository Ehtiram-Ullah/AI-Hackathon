// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateMCQ(topic:string) {
  if (!topic) {
    return { error: "Topic is required" };
  }

  const prompt = `
    Generate one unique multiple-choice question about the topic: "${topic}".
    - Provide exactly 4 options labeled A), B), C), D).
    - The answer must be one of A, B, C, or D.
    - Output strictly in JSON format like this:
      {
        "question": "...",
        "A": "...",
        "B": "...",
        "C": "...",
        "D": "...",
        "answer": "A",
      }
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const jsonOutput = JSON.parse(cleanText);
      console.log(jsonOutput);
      return jsonOutput;
    } catch (err) {
             console.log(cleanText);
      return { error: "Could not decode model output", raw: cleanText };
    }
  } catch (error) {
    return { error: "Gemini request failed"};
  }
}
