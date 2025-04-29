import { useEffect, useState } from "react";
import UserPostForm from "../components/UserPostForm";
import UserPostList from "../components/UserPostList";
import useAuth from "../hooks/useAuth";

const Community = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URI}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handleSubmitPost = async (content, isAnonymous) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URI}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content, isAnonymous }),
        }
      );

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      await fetchPosts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return (
    <div className="md:px-20 px-8 relative py-4 md:pt-5 mt-20">
      <div className="space-y-6 w-1/2">
        <UserPostForm onSubmitPost={handleSubmitPost} />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Erreur: {error}</div>
        ) : (
          <UserPostList posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Community;
