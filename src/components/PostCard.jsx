/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";
import { cleanContent } from "../utils/function";

const PostCard = ({ post }) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const cleanedContent = cleanContent(sanitizedContent);

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white/50 hover:bg-white/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={post.urlToImage}
            alt={post.title}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white max-w-3/5">
              {post.source.name}
            </h2>
            <button className="py-1 px-2.5 border border-gray-200 dark:border-gray-200/20 rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-0">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-500 hover:text-purple-600"
              >
                Read article
              </a>
            </button>
          </div>
          <div
            className="text-sm text-gray-700 dark:text-gray-300 mt-2"
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
          <div className="mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{post.author}{" "}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              .{new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
