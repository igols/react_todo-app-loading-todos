import { url } from 'inspector';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2444;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = (title: string) => {
  client.post<Todo>(`todos`, { userid: USER_ID, title, completed: false });
};

// Add more methods here
