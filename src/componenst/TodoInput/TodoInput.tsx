import styles from './TodoInput.module.css';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TodoInput({ value, onChange, onSubmit }: TodoInputProps) {
  return (
    <form 
      className={styles.todoInputForm} 
      onSubmit={onSubmit}
      data-testid="todo-form"
    >
      <input
        className={styles.todoInput}
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
} 