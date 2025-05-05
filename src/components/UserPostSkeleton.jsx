// components/UserPostSkeleton.jsx
import { ClockIcon } from "@heroicons/react/24/outline";

const UserPostSkeleton = () => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-600" />
          <div>
            <div className="h-4 w-24 bg-gray-50 dark:bg-slate-600 rounded mb-1" />
            <div className="flex items-center">
              <ClockIcon className="w-3 h-3 mr-1 text-gray-400" />
              <div className="h-3 w-16 bg-gray-50 dark:bg-slate-600 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="h-4 bg-gray-50 dark:bg-slate-600 rounded" />
        <div className="h-4 bg-gray-50 dark:bg-slate-600 rounded w-5/6" />
        <div className="h-4 bg-gray-50 dark:bg-slate-600 rounded w-3/4" />
      </div>

      <div className="flex space-x-4 pt-3">
        <div className="h-6 w-16 bg-gray-50 dark:bg-slate-600 rounded" />
        <div className="h-6 w-20 bg-gray-50 dark:bg-slate-600 rounded" />
      </div>
    </div>
  );
};

export default UserPostSkeleton;
