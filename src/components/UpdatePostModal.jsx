/* eslint-disable react/prop-types */
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { validatePostWithGemini } from "../services/geminiService";
import { updatePost } from "../services/postService";
import Avatar from "./Avatar";
import Loader from "./Loader";

const UpdatePostModal = ({ post, onClose, onUpdate }) => {
  const { token, user } = useAuth();
  const [content, setContent] = useState(post.content);
  const [isAnonymous, setIsAnonymous] = useState(post.isAnonymous);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !token || user?.$id !== post?.author.id) return;

    try {
      setIsUpdating(true);

      // Étape 1: Validation du contenu avec Gemini
      const isValid = await validatePostWithGemini(content, token);

      if (!isValid) {
        toast.error("Le contenu ne respecte pas les guidelines");
        setContent("");
        return;
      }

      // Étape 2: Mise à jour optimiste
      const optimisticUpdate = {
        ...post,
        content,
        isAnonymous,
        updatedAt: new Date().toISOString(),
      };
      onUpdate(optimisticUpdate);

      const updatedPost = await updatePost(
        post.idPost,
        content,
        isAnonymous,
        token
      );

      onUpdate(updatedPost);
      toast.success("Post mis à jour avec succès!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);

      if (error.response?.data?.error) {
        toast.error(`Validation error: ${error.response.data.error}`);
      } else {
        toast.error(error.message || "Échec de la mise à jour du post");
        // Annulation de la mise à jour optimiste
        onUpdate(post);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 h-screen flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            Modifier le post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Avatar isAnonymous={isAnonymous} name={post?.author.name} />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {isAnonymous ? "Anonyme" : post?.author.name}
            </p>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="rounded text-purple-600"
              />
              <span className="dark:text-gray-300">Poster anonymement</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-2"
            rows="5"
            placeholder="Qu'est-ce qui vous passe par la tête ?"
            required
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              disabled={isUpdating}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center min-w-[100px]"
              disabled={isUpdating || !content.trim()}
            >
              {isUpdating ? (
                <Loader size="small" />
              ) : (
                <>
                  <CheckIcon className="w-5 h-5 mr-1" />
                  Mettre à jour
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
