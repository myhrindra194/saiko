import { useEffect, useState } from "react";
import UserPostForm from "../components/UserPostForm";
import UserPostList from "../components/UserPostList";
import useAuth from "../hooks/useAuth";
import { addPost, deletePost, fetchPosts } from "../services/postService";

const Community = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await fetchPosts(token);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [token]);

  const handleSubmitPost = async (content, isAnonymous) => {
    try {
      await addPost(content, isAnonymous, token);
      const updatedPosts = await fetchPosts(token);
      setPosts(updatedPosts);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  const handleDeletePost = async (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

    try {
      const result = await deletePost(postId, token);

      if (result.alreadyDeleted) {
        console.log(
          "Post was already deleted on server - UI remains consistent"
        );
        return;
      }

      const freshPosts = await fetchPosts(token);
      setPosts(freshPosts);
    } catch (error) {
      console.error("Delete error:", error);

      try {
        const freshPosts = await fetchPosts(token);
        setPosts(freshPosts);
      } catch (fetchError) {
        console.error("Failed to refresh posts:", fetchError);
      }

      setError(error.message);
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
          <UserPostList posts={posts} onDeletePost={handleDeletePost} />
        )}
      </div>
    </div>
  );
};

export default Community;
