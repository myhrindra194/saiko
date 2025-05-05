export const cleanContent = (content) => {
    return content.replace(/\s*\[\+\d+\s*chars\]\s*$/, '');
};
  

export const sortPostsByDate = (posts = [], order = "recent") => {
  if (!Array.isArray(posts)) return [];
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0); // Fallback si publishedAt manque
    const dateB = new Date(b.publishedAt || 0);
    return order === "recent" ? dateB - dateA : dateA - dateB;
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};