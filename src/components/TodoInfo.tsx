import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Todo } from '../types/Todo';
import { getUser } from './TodoForm';

type Props = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(  
  ({ 
    todo, 
    onDelete,
    onUpdate,
  }) => {
  console.log('TodoInfo', todo.id);

  const {
    selectedUserId,
    newTodoTitle,
  } = useContext(AppContext)

  return (
    <div>
      {todo.user?.name}
      {': '}
      {todo.title}
      {' - '}
      {todo.completed ? 'X' : '0'}

      <button onClick={() => {
        onDelete(todo);
      }}>
        x
      </button>

      <button onClick={() => {
        onUpdate({
          ...todo, 
          userId: selectedUserId, 
          title: newTodoTitle, 
          user: getUser(selectedUserId),
        })
      }}>
        Edit
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.todo === nextProps.todo
});
