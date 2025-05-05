/* eslint-disable react/prop-types */
const Avatar = ({ isAnonymous, name }) => (
  <div className="w-8 h-8 rounded-full bg-purple-100 border border-gray-300 shadow flex items-center justify-center">
    <span className="text-purple-600 text-sm font-medium">
      {isAnonymous ? "?" : name?.charAt(0).toUpperCase()}
    </span>
  </div>
);

export default Avatar;
