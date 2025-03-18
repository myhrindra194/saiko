import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [filter, setFilter] = useState("recent");
  const [selectedSource, setSelectedSource] = useState("all");
  const postsPerPage = 5;
  const observerTarget = useRef(null);

  useEffect(() => {
    let uri =
      "https://newsapi.org/v2/everything?q=mental%20health&language=en&sortBy=publishedAt&apiKey=";
    fetch(`${uri}${import.meta.env.VITE_NEWSAPI_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.articles);
        setVisiblePosts(data.articles.slice(0, postsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      setTimeout(() => {
        const newPosts = posts.slice(
          (page - 1) * postsPerPage,
          page * postsPerPage
        );
        setVisiblePosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLoading(false);
      }, 1000);
    }
  }, [page, posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sortPostsByDate = (posts, order) => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return order === "recent" ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    let filteredPosts = [...posts];

    if (filter === "recent") {
      filteredPosts = sortPostsByDate(filteredPosts, "recent");
    } else if (filter === "oldest") {
      filteredPosts = sortPostsByDate(filteredPosts, "oldest");
    }

    if (selectedSource !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.source.name === selectedSource
      );
    }

    setVisiblePosts(filteredPosts.slice(0, page * postsPerPage));
  }, [filter, selectedSource, posts, page]);

  const sources = [...new Set(posts.map((post) => post.source.name))];

  return (
    <div className="md:px-20 px-8 relative pt-3 md:pt-5">
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none"
        >
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none"
        >
          <option value="all">All ressources</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {visiblePosts.map((post, index) => (
          <div key={index} className="break-inside-avoid mb-6">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <div ref={observerTarget} className="h-10"></div>

      {loading && (
        <div className="flex justify-center mt-6">
          <Loader />
        </div>
      )}

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Blog;
