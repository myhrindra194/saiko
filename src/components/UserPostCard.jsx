/* eslint-disable react/prop-types */
import {
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { formatDate } from "../utils/function";

const UserPostCard = ({ post, onUpdate }) => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(post?.comments || []);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.some((like) => like.userId === token?.userId)
  );

  const BASE_API_URI = import.meta.env.VITE_BASE_API_URI;

  const handleLike = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${BASE_API_URI}/posts/${post.idPost}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle like");

      const updatedPost = await response.json();
      setIsLiked(!isLiked);
      if (onUpdate) onUpdate(updatedPost);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !token) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_API_URI}/posts/${post.idPost}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: commentContent }),
        }
      );

      if (!response.ok) throw new Error("Failed to add comment");

      const data = await response.json();
      setComments([...comments, data]);
      setCommentContent("");
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URI}/posts/${post.idPost}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = async () => {
    setIsModalOpen(true);
    await fetchComments();
  };

  return (
    <>
      {/* Carte de base */}
      <div
        className="p-6 rounded-lg shadow-lg bg-white/50 hover:bg-white/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 transition-shadow duration-300 cursor-pointer"
        onClick={openModal}
      >
        {/* ... (contenu existant de la carte) ... */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">
                  {post?.isAnonymous
                    ? "?"
                    : post?.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post?.isAnonymous ? "Anonymous" : post?.author.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center dark:text-white">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {formatDate(post?.createdAt)}
                </p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-300 rounded-full text-gray-600 dark:text-gray-800">
              Post #{post?.idPost}
            </span>
          </div>

          <p className="mb-4 whitespace-pre-line text-gray-600 dark:text-gray-300 text-sm">
            {post?.content}
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
              >
                {isLiked ? (
                  <HeartIconSolid className="w-5 h-5 mr-1 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 mr-1" />
                )}
                <span className="text-sm">{post?.likes?.length}</span>
              </button>
              <button
                className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              >
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-1" />
                <span className="text-sm">{post?.comments?.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full h-fit overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold dark:text-white">
                  Post Details
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Contenu du post */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {post?.isAnonymous
                        ? "?"
                        : post?.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post?.isAnonymous ? "Anonymous" : post?.author.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center dark:text-gray-300">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {formatDate(post?.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-200">
                  {post?.content}
                </p>
              </div>

              {/* Commentaires */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3 dark:text-white">
                  Comments ({comments.length})
                </h3>
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {comment.author.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm font-medium dark:text-white">
                            {comment.author.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No comments yet
                  </p>
                )}
              </div>

              {/* Formulaire d'ajout de commentaire */}
              {token && (
                <form onSubmit={handleAddComment} className="mt-4">
                  <div className="mb-2">
                    <textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      disabled={isSubmitting}
                    />
                  </div>
                  {error && (
                    <div className="mb-2 text-sm text-red-500">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={!commentContent.trim() || isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPostCard;
