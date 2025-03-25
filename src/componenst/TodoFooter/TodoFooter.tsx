import { TodoFilter } from '../../types/todo';
import styles from './TodoFooter.module.css';

interface TodoFooterProps {
  itemsLeft: number;
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

export function TodoFooter({
  itemsLeft,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className={styles.todoFooter}>
      <span className={styles.todoCount}>
        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
      </span>

      <div className={styles.todoFilters}>
        <button
          className={`${styles.todoFilterButton} ${filter === 'all' ? styles.selected : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`${styles.todoFilterButton} ${filter === 'active' ? styles.selected : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`${styles.todoFilterButton} ${filter === 'completed' ? styles.selected : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <button className={styles.todoClearButton} onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
} 