import { useState, useEffect, useMemo } from "react";
import { Todo, TodoFilter } from "../../types/todo";
import { TodoInput } from "../TodoInput";
import { TodoList } from "../TodoList";
import { TodoFooter } from "../TodoFooter";
import styles from "./Todo.module.css";
import { getFromStorage, setToStorage } from "../../utils/localStorage";

const STORAGE_KEY = "todos-react-ts";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(getFromStorage(STORAGE_KEY) ?? []);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    setToStorage<Todo[]>(STORAGE_KEY, todos);
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([
      ...todos,
      {
        id: new Date().getTime().toString(),
        text: newTodo.trim(),
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      }),
    [filter, todos]
  );

  const itemsLeft = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.todoTitle}>todos</h1>
      <div className={styles.todoPaper}>
        <TodoInput
          value={newTodo}
          onChange={setNewTodo}
          onSubmit={handleSubmit}
        />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} />
        <TodoFooter
          itemsLeft={itemsLeft}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}
