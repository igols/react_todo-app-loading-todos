import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
type Props = {
  todos: Todo[];
  selectedFilter: string;
  setselectedFilter: (value: string) => void;
  handleClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  selectedFilter,
  setselectedFilter,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length}
      </span>

      {/*+ Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {['All', 'Active', 'Completed'].map(item => {
          return (
            <a
              key={item}
              href="#/${item}"
              className={cn('filter__link', {
                selected: selectedFilter === item,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setselectedFilter(item)}
            >
              {item}
            </a>
          );
        })}
      </nav>

      {
        /* + this button should be disabled if there are no completed todos */
        selectedFilter === 'Completed' && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
