import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY=import.meta.env.VITE_GEMINI_API_KEY;

export const validatePostWithGemini = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      apiVersion: "v1beta",
    });

    const prompt = `Ce post est-il approprié pour une communauté bienveillante ? Réponds uniquement par "true" ou "false".
    
    Critères de rejet:
    - Langage offensant ou insultes
    - Conseils dangereux ou illégaux
    - Harcèlement ou discrimination
    - Contenu explicite ou NSFW
    
    Post: ${text}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = response.text().trim().toLowerCase();

    return textResponse === "true";
  } catch (error) {
    console.error("Erreur avec l'API Gemini:", error);
    return false;
  }
};


export const getBotResponseWithGemini = async (userText) => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      apiVersion: "v1beta",
    });

    const prompt = `Tu es un assistant IA bienveillant, empathique et professionnel, spécialisé en soutien psychologique et en bien-être mental. Ton rôle est d'écouter activement, d'offrir des conseils personnalisés et d'accompagner les utilisateurs dans leur parcours émotionnel. Tu dois adapter ton ton (chaleureux, rassurant, encourageant) en fonction des besoins de la personne.

    Règles strictes :
    - Ne jamais diagnostiquer ou remplacer un avis médical.
    - Éviter les jugements et rester neutre (ex. : pas de religiosité/politique).
    - Prioriser la sécurité : en cas de détresse grave (idées noires), diriger vers des urgences spécialisées à Madagascar.
    - Essaie d'etre bref, limite le nombre de phrase à 3

    Text: ${userText}` ;

    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log(response);
    
    const textResponse = response.candidates[0].content.parts[0].text;

    

    return textResponse;
  } catch (error) {
    console.error("Erreur avec l'API Gemini: ", error);
    return null;
    
  }
}
