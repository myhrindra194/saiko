/* eslint-disable react/prop-types */
import { ClockIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { addComment, fetchComments } from "../services/postService";
import { formatDate } from "../utils/function";
import Avatar from "./Avatar";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import ConfirmationModal from "./ConfirmationModal";
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
  onDelete,
}) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = user?.$id === post?.author.id;

  useEffect(() => {
    const loadComments = async () => {
      if (!token) return;

      try {
        setIsLoadingComments(true);
        const commentsData = await fetchComments(post.idPost, token);
        setComments(commentsData);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [post.idPost, token]);

  const handleAddComment = async (content, isAnonymous) => {
    if (!content.trim() || !token) return;

    try {
      const newComment = await addComment(
        post.idPost,
        content,
        isAnonymous,
        token
      );
      setComments((prev) => [newComment, ...prev]);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to add comment:", err);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!token || !isAuthor) return;

    setIsDeleting(true);
    try {
      await onDelete(post.idPost);
    } catch (err) {
      console.error("Delete UI error:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 h-screen">
        <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="p-6 overflow-y-hidden flex-grow">
            <header className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold dark:text-white">
                Post #{post.idPost}
              </h2>
              <div className="flex items-center space-x-4">
                {isAuthor && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(true);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete post"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </header>

            <section className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Avatar
                  isAnonymous={post?.isAnonymous}
                  name={post?.author.name}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post?.isAnonymous ? "Anonyme" : post?.author.name}
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
                Commentaires ({comments.length})
              </h3>
              {isLoadingComments ? (
                <Loader />
              ) : comments.length > 0 ? (
                <div className="space-y-4 max-h-[30vh] overflow-y-auto py-6">
                  {comments.map((comment) => (
                    <CommentCard key={comment.commentId} comment={comment} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun commentaire
                </p>
              )}
            </section>
          </div>

          <footer className="p-4 border-t border-gray-200 dark:border-slate-700">
            <CommentForm onSubmit={handleAddComment} isLoading={false} />
          </footer>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isProcessing={isDeleting}
      />
    </>
  );
};

export default UserPostModal;
