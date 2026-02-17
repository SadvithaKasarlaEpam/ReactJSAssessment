import React, { useState, useEffect } from "react";
import type { Post } from "../api/postService";
import { createPost } from "../api/postService";
import { updatePost } from "../api/postService";

interface UserStatusProps {
  userId: number | null;
  onSuccess: () => void;
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;
}

const PostForm = ({
  userId,
  onSuccess,
  editingPost,
  setEditingPost,
}: UserStatusProps) => {
  const [title, setTitle] = useState("");
  const [views, setViews] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setViews(editingPost.views);
    } else {
      setTitle("");
      setViews(1);
    }
  }, [editingPost]);

  const validate = () => {
    if (!title || title.length < 5)
      return "Title must be at least 5 characters.";
    if (views <= 0) return "Views must be greater than 0.";
    if (!userId && !editingPost) return "Select a user to add a post.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (editingPost) {
      await updatePost({ ...editingPost, title, views });
      setEditingPost(null);
    } else {
      await createPost({ title, views, userId: userId! });
    }
    setTitle("");
    setViews(1);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="number"
        placeholder="Views"
        value={views}
        onChange={(e) => setViews(Number(e.target.value))}
        style={{ width: 60, marginRight: 8 }}
      />
      <button type="submit">{editingPost ? "Update" : "Add"} Post</button>
      {editingPost && (
        <button
          type="button"
          onClick={() => setEditingPost(null)}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default PostForm;
