import React, { ReactNode, useState } from 'react'

export const AppContext = React.createContext({
  newTodoTitle: '',
  setNewTodoTitle: (_str: string) => {},
  selectedUserId: 0,
  setSelectedUserId: (_num: number) => {},
})

type ProviderProps = {
  children: ReactNode,
}

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const context =  {
    newTodoTitle,
    setNewTodoTitle,
    selectedUserId,
    setSelectedUserId,
  }
  
  return (
      <AppContext.Provider value={context}>
        {children}
      </AppContext.Provider>
  )
}