import React, { useState } from "react";
import type { Priority } from "../App";

interface AddTodoFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);
    setTitle("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
