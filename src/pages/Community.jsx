import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Urgence from "../components/Urgence";
import UserPostForm from "../components/UserPostForm";
import UserPostList from "../components/UserPostList";
import UserPostSkeleton from "../components/UserPostSkeleton";
import useAuth from "../hooks/useAuth";
import { addPost, deletePost, fetchPosts } from "../services/postService";

const Community = () => {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    showAnonymous: true,
    showUserPosts: true,
    showOthersPosts: true,
    sortBy: "newest",
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await fetchPosts(token);
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [token]);

  useEffect(() => {
    applyFilters();
  }, [posts, searchTerm, filters]);

  const applyFilters = () => {
    let result = [...posts];

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.content.toLowerCase().includes(term) ||
          (post.author?.name && post.author.name.toLowerCase().includes(term))
      );
    }

    // Filtres de visibilité
    result = result.filter((post) => {
      if (post.isAnonymous && !filters.showAnonymous) return false;
      if (user?.$id === post.author?.id && !filters.showUserPosts) return false;
      if (user?.$id !== post.author?.id && !filters.showOthersPosts)
        return false;
      return true;
    });

    // Tri
    result.sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setFilteredPosts(result);
  };

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
    // Optimistic UI update
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

    try {
      await deletePost(postId, token);
      const freshPosts = await fetchPosts(token);
      setPosts(freshPosts);
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
      // Revert if error
      const freshPosts = await fetchPosts(token);
      setPosts(freshPosts);
    }
  };

  return (
    <div className="md:px-20 px-8 relative py-4 md:pt-5 mt-20 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <div className="md:w-1/5 bg-gray-50/50 dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 h-fit sticky top-20 ">
        <h2 className="font-bold text-lg mb-4 dark:text-white">Filtres</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent focus-within:outline-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Options */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 dark:text-gray-300 flex items-center">
              <FunnelIcon className="w-4 h-4 mr-2" />
              Type de posts
            </h3>
            <div className="space-y-2 pl-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showAnonymous}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      showAnonymous: !filters.showAnonymous,
                    })
                  }
                  className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 hover:border-purple-400 dark:hover:border-purple-400 transition-colors duration-200"
                />
                <span className="dark:text-gray-300">Anonymes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showUserPosts}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      showUserPosts: !filters.showUserPosts,
                    })
                  }
                  className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 hover:border-purple-400 dark:hover:border-purple-400 transition-colors duration-200 "
                />
                <span className="dark:text-gray-300">Mes posts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showOthersPosts}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      showOthersPosts: !filters.showOthersPosts,
                    })
                  }
                  className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 hover:border-purple-400 dark:hover:border-purple-400 transition-colors duration-200"
                />
                <span className="dark:text-gray-300">Posts des autres</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-gray-300">Trier par</h3>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-500 hover:border-purple-400 dark:hover:border-purple-400 transition-colors duration-200 focus-within:outline-0 appearance-none"
            >
              <option value="newest">Plus récent</option>
              <option value="oldest">Plus ancien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-1/2 space-y-6">
        <UserPostForm onSubmitPost={handleSubmitPost} />

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <UserPostSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/30">
            Erreur: {error}
          </div>
        ) : (
          <>
            <div className=" text-gray-500 dark:text-gray-400">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{" "}
              trouvé{filteredPosts.length !== 1 ? "s" : ""}
            </div>
            <UserPostList
              posts={filteredPosts}
              onDeletePost={handleDeletePost}
            />
          </>
        )}
      </div>

      {/* Urgence Component */}
      <Urgence />

      <ScrollToTopButton />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Community;
