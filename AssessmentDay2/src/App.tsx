import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoCounts from "./components/TodoCounts";
import { useState } from "react";

export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

type Filter = "all" | "completed" | "pending";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [nextId, setNextId] = useState(1);

  const addTodo = (title: string, priority: Priority) => {
    setTodos([...todos, { id: nextId, title, completed: false, priority }]);
    setNextId(nextId + 1);
  };

  const toggleTodo = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 16 }}>
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <div style={{ margin: "8px 0" }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          disabled={filter === "pending"}
        >
          Pending
        </button>
      </div>
      <TodoCounts
        total={todos.length}
        completed={completedCount}
        pending={todos.length - completedCount}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
