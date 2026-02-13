interface TodoCountsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoCounts = ({ total, completed, pending }: TodoCountsProps) => (
  <div>
    <span>Total: {total} </span>
    <span>Completed: {completed} </span>
    <span>Pending: {pending}</span>
  </div>
);

export default TodoCounts;
