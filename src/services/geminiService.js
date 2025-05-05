import { GoogleGenerativeAI } from "@google/generative-ai";

export const validatePostWithGemini = async (text) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        apiVersion: "v1",
      });

      const prompt = `Ce post est-il approprié pour une communauté bienveillante ? Réponds uniquement par "true" ou "false".
      
      Critères de rejet:
      - Langage offensant ou insultes
      - Conseils dangereux ou illégaux
      - Harcèlement ou discrimination
      - Contenu explicite ou NSFW
      
      Post: "${text}"`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const textResponse = response.text().trim().toLowerCase();

      return textResponse === "true";
    } catch (error) {
      console.error("Erreur avec l'API Gemini:", error);
      return false;
    }
  };