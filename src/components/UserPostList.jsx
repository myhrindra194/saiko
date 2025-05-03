/* eslint-disable react/prop-types */
import UserPostCard from "./UserPostCard";

const UserPostList = ({ posts, onDeletePost }) => {
  return (
    <div className="space-y-4">
      {posts?.length === 0 ? (
        <div className="text-center py-8">Aucun post à afficher</div>
      ) : (
        posts?.map((post) => (
          <UserPostCard key={post.idPost} post={post} onDelete={onDeletePost} />
        ))
      )}
    </div>
  );
};

export default UserPostList;
