import { GoogleGenerativeAI } from "@google/generative-ai";

export const validatePostWithGemini = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    // On utilise le nom le plus stable et compatible au monde
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Réponds UNIQUEMENT par "true" si ce texte est bienveillant, sinon "false": "${text}"`;

    const result = await model.generateContent(prompt);
    const response =  result.response;
    const textResponse = response.text().trim().toLowerCase();
    

    return textResponse.includes("true");
  } catch (error) {
    // Si même là ça échoue, on log l'erreur pour comprendre
    console.error("Détails de l'erreur Gemini:", error);
    return false;
  }
};