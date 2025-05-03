/* eslint-disable react/prop-types */
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { postService } from "../services/postService";
import { formatDate } from "../utils/function";
import Avatar from "./Avatar";
import CommentCard from "./CommentCard";
import LikeButton from "./LikeButton";
import Loader from "./Loader";

const UserPostModal = ({
  post,
  isLiked,
  likeCount,
  isLikeLoading,
  onLike,
  onClose,
  onUpdate,
}) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true); // Initialisé à true pour afficher le loader immédiatement

  useEffect(() => {
    const loadComments = async () => {
      if (!token) return;

      try {
        const commentsData = await postService.fetchComments(
          post.idPost,
          token
        );
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [post.idPost, token]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !token) return;

    setIsSubmitting(true);
    setError(null);

    const tempComment = {
      _id: Date.now().toString(),
      content: commentContent,
      author: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [tempComment, ...prev]);
    setCommentContent("");

    try {
      const data = await postService.addComment(
        post.idPost,
        commentContent,
        token
      );
      setComments((prev) => [
        data,
        ...prev.filter((c) => c._id !== tempComment._id),
      ]);
      if (onUpdate) onUpdate();
    } catch (err) {
      setComments((prev) => prev.filter((c) => c._id !== tempComment._id));
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto flex-grow">
          <header className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold dark:text-white">
              Post #{post.idPost}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </header>

          <section className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Avatar
                isAnonymous={post?.isAnonymous}
                name={post?.author.name}
              />
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
            <div className="flex space-x-4 mt-3">
              <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                isLoading={isLikeLoading}
                onClick={onLike}
              />
            </div>
          </section>

          <section className="mb-6">
            <h3 className="font-medium text-lg mb-3 dark:text-white">
              Comments ({isLoadingComments ? "..." : comments.length})
            </h3>
            {isLoadingComments ? (
              <Loader />
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentCard key={comment._id} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet
              </p>
            )}
          </section>
        </div>

        <footer className="p-4 border-t border-gray-200 dark:border-slate-700">
          <form onSubmit={handleAddComment}>
            <div className="mb-2">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent focus-within:outline-0"
                rows={2}
                disabled={isSubmitting}
              />
            </div>
            {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
            <button
              type="submit"
              disabled={!commentContent.trim() || isSubmitting}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default UserPostModal;
