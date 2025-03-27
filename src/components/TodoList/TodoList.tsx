import { Todo } from "../../types/todo";
import { TodoItem } from "../TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
}

export function TodoList({ todos, onToggle }: TodoListProps) {
  const handleListItemOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.dataset.todoId as string);
  };

  return (
    <div className={styles.todoList} onChange={handleListItemOnChange}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
