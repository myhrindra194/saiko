export const cleanContent = (content) => {
    return content.replace(/\s*\[\+\d+\s*chars\]\s*$/, '');
};
  

export  const sortPostsByDate = (posts, order) => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return order === "recent" ? dateB - dateA : dateA - dateB;
    });
};