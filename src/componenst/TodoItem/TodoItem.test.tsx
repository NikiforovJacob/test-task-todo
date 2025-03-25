import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false
  };
  
  it('calls onToggle when checkbox is clicked', () => {
    const handleToggle = jest.fn();
    render(<TodoItem todo={mockTodo} onToggle={handleToggle} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('shows completed style when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={() => {}} />);
    
    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('todoText');
    expect(todoText.closest('.todoItem')).toHaveClass('completed');
  });
});