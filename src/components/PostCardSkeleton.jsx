const PostCardSkeleton = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-slate-700"></div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-50 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="py-1 px-2.5 border border-gray-200 dark:border-gray-200/20 rounded-full">
              <div className="h-3 w-16 bg-gray-50 dark:bg-slate-700 rounded"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-4/6"></div>
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-3/6"></div>
          </div>

          <div className="flex space-x-2">
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-1/4"></div>
            <div className="h-3 bg-gray-50 dark:bg-slate-700 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
