import { Todo } from "../../types/todo";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        defaultChecked={todo.completed}
        id={todo.id}
        data-todo-id={todo.id}
      />
      <span className={styles.todoText}>{todo.text}</span>
    </div>
  );
}
