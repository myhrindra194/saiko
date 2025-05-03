import { formatDate } from "../utils/function";

/* eslint-disable react/prop-types */
const CommentCard = ({ comment }) => (
  <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg shadow-xs hover:shadow-sm transition-shadow duration-200 border border-gray-100 dark:border-slate-600">
    <div className="flex items-start gap-3 mb-2">
      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-purple-600 dark:text-purple-300 text-sm font-medium">
          {comment.isAnonymous
            ? "?"
            : comment.author?.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline flex-wrap gap-2">
          <p className="text-sm font-medium dark:text-white truncate">
            {comment.isAnonymous ? "Anonyme" : comment.author.name}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
);

export default CommentCard;
