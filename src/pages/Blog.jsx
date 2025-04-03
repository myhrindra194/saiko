import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { sortPostsByDate } from "../utils/function";

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
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error("Invalid data format: articles is not an array");
        }
        setPosts(data.articles || []);
        setVisiblePosts(data.articles.slice(0, postsPerPage));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const currentObserverTarget = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
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
      window.scrollY > 200
        ? setShowScrollButton(true)
        : setShowScrollButton(false);
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

  useEffect(() => {
    let filteredPosts = [...(posts || [])];

    if (filter === "recent") {
      filteredPosts = sortPostsByDate(filteredPosts, "recent");
    } else if (filter === "oldest") {
      filteredPosts = sortPostsByDate(filteredPosts, "oldest");
    }

    if (selectedSource !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post?.source?.name === selectedSource
      );
    }

    setVisiblePosts(filteredPosts.slice(0, page * postsPerPage));
  }, [filter, selectedSource, posts, page]);

  const sources = Array.isArray(posts)
    ? [...new Set(posts.map((post) => post?.source?.name).filter(Boolean))]
    : [];
  return (
    <div className="md:px-20 px-8 relative py-4 md:pt-5 mt-20">
      <div className="flex flex-wrap gap-4 my-5">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="all">All ressources</option>
          {sources?.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {visiblePosts?.map((post, index) => (
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
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 bg-purple-500 hover:bg-purple-600 text-white"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Blog;
