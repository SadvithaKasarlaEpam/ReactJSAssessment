import type { Todo } from "../App";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <input
            value={todo.title}
            onChange={(e) => onEdit(todo.id, e.target.value)}
          />
          <span>({todo.priority})</span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
