/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, deleteTodos, getTodos, USER_ID } from './api/todos';
import { Header } from './component/Header';
import { Section } from './component/Section/Section';
import { Footer } from './component/Footer/Footer';
import { Todo } from './types/Todo';
import { Error } from './component/Error';


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessege, setErrorMessege] = useState<string>('');
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setselectedFilter] = useState<string>('');

  const loadTodos = async () => {
    try {
      setLoading(true);
      setTodos(await getTodos());
      setErrorMessege('');
    } catch {
      setErrorMessege('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleAddTodo(event: React.FormEvent) {
    event.preventDefault();
    if (!newTodo.trim()) {
      setErrorMessege('Title should not be empty');

      return;
    }

    try {
      setLoading(true);
      const createdTodo = await addTodos(newTodo);

      setTodos([...todos, createdTodo]);
      setNewTodo('');
      setErrorMessege('');
    } catch {
      setErrorMessege('Unable to add a todo');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      setLoading(true);
      setErrorMessege('');
      await deleteTodos(id);
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, isLoading: true } : todo,
        ),
      );
    } catch {
      setErrorMessege('Unable to delete a todo');
    } finally {
      setLoading(false);
    }
  }

  const filteredTodos = () => {
    switch (selectedFilter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          todos={filteredTodos()}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          loading={loading}
          handleAddTodo={handleAddTodo}
        />
        <Section todos={todos} handleDeleteTodo={handleDeleteTodo} />
        {/*+ Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedFilter={selectedFilter}
            setselectedFilter={setselectedFilter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {/*+ DON'T use conditional rendering to hide the notification */}
      {/*+ Add the 'hidden' class to hide the message smoothly */}

      <Error errorMessege={errorMessege} />
    </div>
  )};
