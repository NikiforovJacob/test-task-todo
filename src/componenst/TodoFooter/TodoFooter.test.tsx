import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoFooter } from './TodoFooter';

describe('TodoFooter', () => {
  it('calls onFilterChange when filter is clicked', () => {
    const handleFilterChange = jest.fn();
    render(
      <TodoFooter
        itemsLeft={0}
        filter="all"
        onFilterChange={handleFilterChange}
        onClearCompleted={() => {}}
      />
    );
    
    fireEvent.click(screen.getByText('Active'));
    expect(handleFilterChange).toHaveBeenCalledWith('active');
    fireEvent.click(screen.getByText('Completed'));
    expect(handleFilterChange).toHaveBeenCalledWith('completed');
    fireEvent.click(screen.getByText('All'));
    expect(handleFilterChange).toHaveBeenCalledWith('all');
  });

  it('calls onClearCompleted when clear button is clicked', () => {
    const handleClearCompleted = jest.fn();
    render(
      <TodoFooter
        itemsLeft={0}
        filter="all"
        onFilterChange={() => {}}
        onClearCompleted={handleClearCompleted}
      />
    );
    
    fireEvent.click(screen.getByText('Clear completed'));
    expect(handleClearCompleted).toHaveBeenCalled();
  });
}); 