import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

/* eslint-disable react/prop-types */
const CommentButton = ({ count, onClick }) => (
  <button
    className="flex items-center text-gray-500 hover:text-purple-500 transition-colors"
    onClick={onClick}
  >
    <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-1" />
    <span className="text-sm">
      {count} Commentaire{count > 1 ? "s" : ""}
    </span>
  </button>
);
export default CommentButton;
