const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

export const sendToChatbot = async (message) => {
  const response = await fetch(`${BASE_API_URI}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: message }),
  });

  if (!response.ok) throw new Error("Erreur réseau");
  return response.json();
};