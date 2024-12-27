import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { User } from '../types/types';


export interface UserContextType {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}

const defaultUser = {
  user: {
    name: '',
    email: '',
    isAdmin: false
  },
  setUser: (user: User) => {}
} as UserContextType;

export const UserContext = createContext(defaultUser);


interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    isAdmin: false
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}