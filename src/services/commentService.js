const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

export const deleteComment = async (postId, commentId, token) => {
    const response = await fetch(`${BASE_API_URI}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
    
}

