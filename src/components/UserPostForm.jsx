/* eslint-disable react/prop-types */
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { validatePostWithGemini } from "../services/geminiService";

const UserPostForm = ({ onSubmitPost }) => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const isValid = await validatePostWithGemini(content);

    if (!isValid) {
      toast.error(
        "Votre message ne respect pas nos règles de bienveillance. Veuillez reformuler.",
        { duration: 2000 }
      );
      setContent("");
      setIsSubmitting(false);
      return;
    }

    const success = await onSubmitPost(content, isAnonymous);

    if (success) {
      setContent("");
      setIsAnonymous(true);
      toast.success("Post publié avec succès!", { duration: 2000 });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 transition-colors duration-300 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comment vous vous sentez aujourd'hui?"
            className="w-full px-4 py-3 rounded-lg dark:border-slate-600 bg-white/50 dark:bg-slate-700/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus-within:outline-none"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="mb-2 text-sm text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
            <span className="ms-3 font-medium text-gray-700 dark:text-gray-300">
              Publier anonymement
            </span>
          </label>

          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
            {isSubmitting ? "Publication..." : "Publier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPostForm;
