export const cleanContent = (content) => {
    return content.replace(/\s*\[\+\d+\s*chars\]\s*$/, '');
};
  

export const sortPostsByDate = (posts = [], order = "recent") => {
  if (!Array.isArray(posts)) return [];
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0);
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


export const filterBySearchTerm = (data, searchTerm) => {
  if (!searchTerm) return data;
  
  return data.filter(psy => {
    const searchLower = searchTerm.toLowerCase();
    return (
      psy.nom.toLowerCase().includes(searchLower) ||
      psy.specialite.toLowerCase().includes(searchLower) ||
      (psy.adresse && psy.adresse.toLowerCase().includes(searchLower))
    );
  });
};

export const filterByRegion = (data, region) => {
  if (!region) return data;
  
  return data.filter(psy => {
    return region === "Antananarivo" 
      ? psy.adresse?.includes("ANTANANARIVO")
      : !psy.adresse?.includes("ANTANANARIVO");
  });
};

export const filterByDisponibilite = (data, disponibilite) => {
  if (!disponibilite) return data;
  
  return data.filter(psy => {
    switch(disponibilite) {
      case "En ligne":
        return psy.disponibilites?.includes("Disponible en ligne");
      case "Domicile":
        return psy.disponibilites?.includes("Visite à domicile");
      default:
        return true;
    }
  });
};

export const applyAllFilters = (data, { searchTerm, region, disponibilite }) => {
  let result = data;
  result = filterBySearchTerm(result, searchTerm);
  result = filterByRegion(result, region);
  result = filterByDisponibilite(result, disponibilite);
  return result;
};

