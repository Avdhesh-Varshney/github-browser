'use client';

import { User } from "@/types";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;

  searchUserData: User[];
  setSearchUserData: Dispatch<SetStateAction<User[]>>;

  usersDetails: User;
  setUsersDetails: Dispatch<SetStateAction<User>>;
};

export const GlobalContext = createContext<ContextProps>({
  userName: '',
  setUserName: () => {},

  searchUserData: [],
  setSearchUserData: () => {},

  usersDetails: {} as User,
  setUsersDetails: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string>('');
  const [searchUserData, setSearchUserData] = useState<User[]>([]);
  const [usersDetails, setUsersDetails] = useState<User>({} as User);

  return (
    <GlobalContext.Provider
      value={{
        userName, setUserName,
        searchUserData, setSearchUserData,
        usersDetails, setUsersDetails
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
