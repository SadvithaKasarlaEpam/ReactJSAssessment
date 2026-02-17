import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/postService";
import PostForm from "./PostForm";
import type { Post } from "../api/postService";

interface UserIdProps {
  userId: number | null;
}

const PostList = ({ userId }: UserIdProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const fetchPosts = () => {
    getPosts(userId === null ? undefined : userId)
      .then((data) => {
        console.log("posts:", data);
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    fetchPosts();
  };

  return (
    <div>
      <h3>Posts</h3>
      <PostForm
        onSuccess={fetchPosts}
        userId={userId}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b> (Views: {post.views})
            <button
              onClick={() => setEditingPost(post)}
              style={{ marginLeft: 8 }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              style={{ marginLeft: 4 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
