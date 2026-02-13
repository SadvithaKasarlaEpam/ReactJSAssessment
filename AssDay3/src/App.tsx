import { useReducer, useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoCounts from "./components/TodoCounts";

export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}
type Filter = "all" | "completed" | "pending";

type Action =
  | { type: "ADD"; title: string; priority: Priority }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "EDIT"; id: number; title: string };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: state.length ? Math.max(...state.map((t) => t.id)) + 1 : 1,
          title: action.title,
          completed: false,
          priority: action.priority,
        },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      );
    default:
      return state;
  }
}

const App = () => {
  // useReducer for todos
  const [todos, dispatch] = useReducer(todoReducer, []);

  // useState for filter
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("todos key", JSON.stringify(todos));

    console.log("Todos changed:", todos);
  }, [todos]);

  const addTodo = (title: string, priority: Priority) => {
    dispatch({ type: "ADD", title, priority });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE", id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE", id });
  };

  const editTodo = (id: number, title: string) => {
    dispatch({ type: "EDIT", id, title });
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
      <h2>Advanced Todo Dashboard</h2>
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
};

export default App;
