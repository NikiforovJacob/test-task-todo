import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoApp } from './Todo';

describe('TodoApp Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders empty todo list initially', () => {
    render(<TodoApp />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();
    expect(screen.getByText(/items left/)).toBeInTheDocument();
  });

  it('adds and completes todo', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    // Add todo
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.submit(input);
    expect(screen.getByText('New todo item')).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/item.*left/)).toBeInTheDocument();

    // Complete todo
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(screen.getByText(/0/)).toBeInTheDocument();
    expect(screen.getByText(/items left/)).toBeInTheDocument();
  });

  it('filters and clears todos', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    // Add todos
    fireEvent.change(input, { target: { value: 'Active todo' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Completed todo' } });
    fireEvent.submit(input);

    // Complete one todo
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Complete the second todo

    // Test filters
    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Active todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toBeInTheDocument();

    // Clear completed
    fireEvent.click(screen.getByText('Clear completed'));
    expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();
  });

  it('persists todos in localStorage', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    fireEvent.change(input, { target: { value: 'Persistent todo' } });
    fireEvent.submit(input);

    const savedTodos = JSON.parse(localStorage.getItem('todos-react-ts') || '[]');
    expect(savedTodos).toHaveLength(1);
    expect(savedTodos[0].text).toBe('Persistent todo');
  });
}); 