import axiosInstance from "./axiosInstance";

export interface Post {
  id: number;
  title: string;
  views: number;
  userId: number;
}

export const getPosts = async (userId?: number): Promise<Post[]> => {
  const url = userId ? `/posts?userId=${userId}` : "/posts";
  const res = await axiosInstance.get<Post[]>(url);
  return res.data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const res = await axiosInstance.post<Post>("/posts", post);
  return res.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const res = await axiosInstance.put<Post>(`/posts/${post.id}`, post);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
