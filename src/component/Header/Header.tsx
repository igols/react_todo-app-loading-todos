import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  newTodo: string;
  setNewTodo: (newTodo: string) => void;
  loading: boolean;
  handleAddTodo?: (event: React.FormEvent) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  newTodo,
  setNewTodo,
  loading,
  handleAddTodo,
}) => {
  return (
    <header className="todoapp__header">
      {/* + this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />
      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          disabled={loading}
        />
      </form>
    </header>
  );
};
