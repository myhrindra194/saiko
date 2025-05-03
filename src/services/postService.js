// src/services/postService.js

const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

export const postService = {
  async likePost(postId, token) {
    const response = await fetch(`${BASE_API_URI}/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) throw new Error("Failed to toggle like");
    return await response.json();
  },

  async addComment(postId, content, token) {
    const response = await fetch(`${BASE_API_URI}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) throw new Error("Failed to add comment");
    return await response.json();
  },

  async fetchComments(postId, token) {
    const response = await fetch(`${BASE_API_URI}/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error("Failed to fetch comments");
    return await response.json();
  }
};