const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

export const fetchMentalHealthNews = async () => {
  try {
    const response = await fetch(`${BASE_API_URI}/api/news`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    // On retourne directement les articles pour simplifier le travail du composant
    return data.articles || [];
  } catch (error) {
    console.error("Erreur dans newsService:", error);
    throw error;
  }
};