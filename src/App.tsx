import { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import './App.scss';
import { getUser, TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { AppContext } from './context/AppProvider';
import { Todo, TodoWithoutUser } from './types/Todo';

const todosFromServer: TodoWithoutUser[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];

let oldTodos: Todo[] = [];
let oldDelete: (todo: Todo) => void = () => {};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }))
  });
  const [visibleTodos, setVisibleTodos] = useState(todos)
  const [query, setQuery] = useState('');

  const {
    newTodoTitle,
    selectedUserId,
  } = useContext(AppContext)

  console.log(oldTodos, todos, oldTodos === todos);
  oldTodos = todos;
  
  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo])
  }

  const deleteTodo = useCallback(
    (todoToDelete: Todo) => {
      setTodos((prevState) => prevState.filter(
        todo => todo.id !== todoToDelete.id,
      ));
    },

    [todos],
  );

  useEffect(() => {
    setVisibleTodos(todos.filter((todo => todo.title.includes(query))));
  }, [query, todos])

  console.log(oldDelete, deleteTodo, oldDelete === deleteTodo);
  oldDelete = deleteTodo;
  

  const updateTodo = (updatedTodo: Todo) => {
    const updtodo = {
      userId: selectedUserId,
      title: newTodoTitle,
      user: getUser(selectedUserId),
      id: updatedTodo.id,
      completed: updatedTodo.completed
    }
    setTodos((prevState) => prevState.map(todo => {
      if (todo.id !== updatedTodo.id) {
        return todo;
      }

      return updtodo;
    }));
  }

  return (
    <div className="App">
      <DebounceInput
        debounceTimeout={300}
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <TodoForm 
        onSubmit={addTodo} 
      />
      <TodoList
        todos={visibleTodos}
        updateTodo={updateTodo}
        onTodoDeleted={deleteTodo}
      />
    </div>
  );
}


