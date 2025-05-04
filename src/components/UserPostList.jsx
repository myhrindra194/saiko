/* eslint-disable react/prop-types */
import UserPostCard from "./UserPostCard";

const UserPostList = ({ posts, onDeletePost, onUpdate }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <UserPostCard
          key={post.idPost}
          post={post}
          onDelete={onDeletePost}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default UserPostList;
