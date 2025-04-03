// /api/news.js
export default async function handler(req, res) {
    try {
      const params = new URLSearchParams({
        q: "mental health",
        language: "en",
        sortBy: "publishedAt"
      });
  
      const response = await fetch(
        `https://newsapi.org/v2/everything?${params}`,
        {
          headers: {
            "X-Api-Key": import.meta.process.env.NEWSAPI_SECRET_KEY
          }
        }
      );
  
      if (!response.ok) throw new Error("API request failed");
      
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }