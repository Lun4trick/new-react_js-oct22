import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(  
  ({ todo, onDelete }) => {
  console.log('TodoInfo', todo.id);

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

      <button onClick={() => {}}>
        Edit
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.todo === nextProps.todo
});
