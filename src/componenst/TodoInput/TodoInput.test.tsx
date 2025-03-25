import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoInput } from './TodoInput';

describe('TodoInput', () => {
  it('renders input field', () => {
    render(
      <TodoInput
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(
      <TodoInput
        value=""
        onChange={handleChange}
        onSubmit={() => {}}
      />
    );
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New todo' } });
    
    expect(handleChange).toHaveBeenCalledWith('New todo');
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(
      <TodoInput
        value=""
        onChange={() => {}}
        onSubmit={handleSubmit}
      />
    );
    
    const form = screen.getByTestId('todo-form');
    fireEvent.submit(form);
    
    expect(handleSubmit).toHaveBeenCalled();
  });
}); 