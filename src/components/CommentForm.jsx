/* eslint-disable react/prop-types */
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const CommentForm = ({ onSubmit, isLoading }) => {
  const [commentContent, setCommentContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(commentContent, isAnonymous);
      setCommentContent("");
    } catch (err) {
      setError(err.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent focus-within:outline-0"
          rows={2}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between mb-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Comment anonymously
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={!commentContent.trim() || isLoading}
          className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="w-5 h-5 mr-2" />
          {isSubmitting ? "Loading..." : "Comment"}
        </button>
      </div>
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
    </form>
  );
};

export default CommentForm;
