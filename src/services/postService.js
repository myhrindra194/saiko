const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

export const fetchPosts = async (token) => {
  if (!token) return [];

  const response = await fetch(`${BASE_API_URI}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  return await response.json();
};

export const addPost = async (content, isAnonymous, token) => {
  const response = await fetch(`${BASE_API_URI}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, isAnonymous }),
  });

  if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  return await response.json();
};


export const likePost = async (postId, token) => {
  const response = await fetch(`${BASE_API_URI}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) throw new Error("Failed to toggle like");
  return await response.json();
};

export const addComment = async (postId, content, isAnonymous, token) => {
  const response = await fetch(`${BASE_API_URI}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, isAnonymous }),
  });
  
  if (!response.ok) throw new Error("Failed to add comment");
  return await response.json();
};

export const fetchComments = async (postId, token) => {
  const response = await fetch(`${BASE_API_URI}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) throw new Error("Failed to fetch comments");
  return await response.json();
};

export const deletePost = async (postId, token) => {
  const response = await fetch(`${BASE_API_URI}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 204) {
    return { success: true };
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const updatePost = async (postId, content, isAnonymous, token) => {
  const response = await fetch(`${BASE_API_URI}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, isAnonymous }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return await response.json();
};