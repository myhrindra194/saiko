/* eslint-disable react/prop-types */
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const LikeButton = ({ isLiked, likeCount, isLoading, onClick }) => (
  <button
    className={`flex items-center ${
      isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-red-500"
    } transition-colors`}
    onClick={onClick}
    disabled={isLoading}
  >
    {isLiked ? (
      <HeartIconSolid className="w-5 h-5 mr-1 text-red-500" />
    ) : (
      <HeartIcon className="w-5 h-5 mr-1 text-gray-500" />
    )}
    <span className={`text-sm ${isLiked ? "text-red-500" : "text-gray-500"}`}>
      {likeCount} {likeCount > 1 ? "Likes" : "Like"}
    </span>
  </button>
);

export default LikeButton;
