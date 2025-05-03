import { formatDate } from "../utils/function";

/* eslint-disable react/prop-types */
const CommentCard = ({ comment }) => (
  <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
    <div className="flex items-center space-x-2 mb-1">
      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
        <span className="text-purple-600 text-xs font-medium">
          {comment.author?.name.charAt(0).toUpperCase()}
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
);

export default CommentCard;
