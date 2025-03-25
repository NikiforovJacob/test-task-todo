import { Todo } from "../../types/todo";
import { TodoItem } from "../TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
}

export function TodoList({ todos, onToggle }: TodoListProps) {
  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}
