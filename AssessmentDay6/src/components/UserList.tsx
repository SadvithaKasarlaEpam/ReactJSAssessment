import { useEffect, useState } from "react";
import { getUsers } from "../api/userService";
import type { User } from "../api/userService";

interface SelectedUserProps {
  selectedUserId: number | null;
  onSelect: (id: number | null) => void;
}

const UserList = ({ selectedUserId, onSelect }: SelectedUserProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        console.log("users:", data);
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <button
        onClick={() => onSelect(null)}
        style={{ fontWeight: selectedUserId === null ? "bold" : "normal" }}
      >
        All
      </button>
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelect(user.id)}
          style={{
            fontWeight: selectedUserId === user.id ? "bold" : "normal",
            marginLeft: 8,
          }}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
};

export default UserList;
