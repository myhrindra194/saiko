/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline";
const ToastError = ({ content }) => {
  return (
    <div
      id="toast-danger"
      className="flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 bg-white rounded-lg shadow-sm  mt-3 dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <XMarkIcon />
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{content}</div>
    </div>
  );
};

export default ToastError;
