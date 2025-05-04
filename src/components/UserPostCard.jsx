/* eslint-disable react/prop-types */
import { ClockIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { likePost } from "../services/postService";
import { formatDate } from "../utils/function";
import Avatar from "./Avatar";
import CommentButton from "./CommentButton";
import ConfirmationModal from "./ConfirmationModal";
import LikeButton from "./LikeButton";
import UpdatePostModal from "./UpdatePostModal";
import UserPostModal from "./UserPostModal";

const UserPostCard = ({ post, onUpdate, onDelete }) => {
  const { token, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = user?.$id === post?.author.id;

  useEffect(() => {
    if (post) {
      const userLikeStatus = post.likes?.includes(user?.$id);
      setIsLiked(userLikeStatus);
      setLikeCount(post.likes?.length || 0);
    }
  }, [post, user]);

  const handleLike = async (e) => {
    e?.stopPropagation();
    if (!token || isLikeLoading) return;

    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));
    setIsLikeLoading(true);

    try {
      const updatedPost = await likePost(post.idPost, token);
      if (onUpdate) onUpdate(updatedPost);
    } catch (err) {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (newLikeStatus ? prev - 1 : prev + 1));
      console.error("Like error:", err);
    } finally {
      setIsLikeLoading(false);
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

  const openModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(true);
  };

  const openUpdateModal = (e) => {
    e?.stopPropagation();
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <article
        className="p-4 rounded-lg shadow-lg bg-white/50 hover:bg-white/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 transition-shadow duration-300 cursor-pointer relative"
        onClick={openModal}
      >
        {isAuthor && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              onClick={openUpdateModal}
              aria-label="Edit post"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              aria-label="Delete post"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar isAnonymous={post?.isAnonymous} name={post?.author.name} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post?.isAnonymous ? "Anonyme" : post?.author.name}
              </p>
              <p className="text-xs text-gray-500 flex items-center dark:text-white">
                <ClockIcon className="w-3 h-3 mr-1" />
                {formatDate(post?.createdAt)}
              </p>
            </div>
          </div>
        </header>

        <p className="mb-4 whitespace-pre-line text-gray-900 dark:text-gray-300">
          {post?.content}
        </p>

        <footer className="flex items-center justify-between pt-3">
          <div className="flex space-x-4">
            <LikeButton
              isLiked={isLiked}
              likeCount={likeCount}
              isLoading={isLikeLoading}
              onClick={handleLike}
            />
            <CommentButton count={post?.comments?.length} onClick={openModal} />
          </div>
        </footer>
      </article>

      {isModalOpen && (
        <UserPostModal
          post={post}
          isLiked={isLiked}
          likeCount={likeCount}
          isLikeLoading={isLikeLoading}
          onLike={handleLike}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}

      {isUpdateModalOpen && (
        <UpdatePostModal
          post={post}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedPost) => {
            if (onUpdate) onUpdate(updatedPost);
            setIsUpdateModalOpen(false);
          }}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        isProcessing={isDeleting}
      />
    </>
  );
};

export default UserPostCard;
