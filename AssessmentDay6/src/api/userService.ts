import axiosInstance from "./axiosInstance";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<User[]>("/users");
  return res.data;
};
