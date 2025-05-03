/* eslint-disable react/prop-types */
// src/components/UserPostCard.jsx
import {
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { postService } from "../services/postService";
import { formatDate } from "../utils/function";
import Avatar from "./Avatar";
import LikeButton from "./LikeButton";
import PostBadge from "./PostBadge";
import UserPostModal from "./UserPostModal";

const UserPostCard = ({ post, onUpdate }) => {
  const { token, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    if (post) {
      const userLikeStatus = post.likes?.some(
        (like) => like.userId === user?._id
      );
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
      const updatedPost = await postService.likePost(post.idPost, token);
      if (onUpdate) onUpdate(updatedPost);
    } catch (err) {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (newLikeStatus ? prev - 1 : prev + 1));
      console.error("Like error:", err);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const openModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <article
        className="p-4 rounded-lg shadow-lg bg-white/50 hover:bg-white/70 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-gray-200 dark:border-slate-700 transition-shadow duration-300 cursor-pointer"
        onClick={openModal}
      >
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar isAnonymous={post?.isAnonymous} name={post?.author.name} />
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
          <PostBadge id={post?.idPost} />
        </header>

        <p className="mb-4 whitespace-pre-line text-gray-900 dark:text-gray-300 text-sm">
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
        />
      )}
    </>
  );
};

const CommentButton = ({ count, onClick }) => (
  <button
    className="flex items-center text-gray-500 hover:text-purple-500 transition-colors"
    onClick={onClick}
  >
    <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-1" />
    <span className="text-sm">
      {count} Comment{count > 1 ? "s" : ""}
    </span>
  </button>
);

export default UserPostCard;
