import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppProvider';
import { Todo } from '../types/Todo';
import { User } from '../types/User';


export const usersFromServer: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
];

export function getUser(id: number) {
  return usersFromServer.find(user => user.id === id);
}

type Props = {
  onSubmit: (todo: Todo) => void,
  todo?: Todo,
}

export const TodoForm: React.FC<Props> = ({ 
  onSubmit, 
  todo,
}) => {

  const {
    newTodoTitle,
    setNewTodoTitle,
    selectedUserId,
    setSelectedUserId,
  } = useContext(AppContext)

  useEffect(() => {
    setNewTodoTitle(todo?.title || '')
    setSelectedUserId(todo?.userId || 0)
  }, [setNewTodoTitle, setSelectedUserId, todo?.title, todo?.userId])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          id: todo?.id || Date.now(),
          title: newTodoTitle,
          userId: selectedUserId,
          completed: todo?.completed || false,
          user: getUser(selectedUserId),
        });
      }}
    >
      <input
        type="text"
        value={newTodoTitle}
        onChange={(event) => {
          setNewTodoTitle(event.target.value);
        }} />

      <select
        value={selectedUserId}
        onChange={(event) => {
          setSelectedUserId(+event.target.value);
        }}
      >
        <option value="0">---</option>
        {usersFromServer.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button>{todo ? 'Save' : 'Add'}</button>
    </form>
  );
};
