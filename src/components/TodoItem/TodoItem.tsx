import { Todo } from "../../types/todo";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={styles.todoText}>{todo.text}</span>
    </div>
  );
}
