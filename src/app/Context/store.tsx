'use client';

import { User, UserDetails } from "@/types";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  userName: string,
  setUserName: Dispatch<SetStateAction<string>>,

  repoName: string,
  setRepoName: Dispatch<SetStateAction<string>>,

  searchUserData: User[],
  setSearchUserData: Dispatch<SetStateAction<User[]>>,

  usersDetails: UserDetails;
  setUsersDetails: Dispatch<SetStateAction<UserDetails>>;
};

const GlobalContext = createContext<ContextProps>({
  userName: '',
  setUserName: (): string => '',

  repoName: '',
  setRepoName: (): string => '',

  searchUserData: [],
  setSearchUserData: (): User[] => [],

  usersDetails: {} as UserDetails,
  setUsersDetails: () => ({} as UserDetails)
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [userName, setUserName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [searchUserData, setSearchUserData] = useState<[] | User[]>([]);
  const [usersDetails, setUsersDetails] = useState<UserDetails>({} as UserDetails);

  return (
    <GlobalContext.Provider value={{ userName, setUserName, 
                                      repoName, setRepoName, 
                                      searchUserData, setSearchUserData,
                                      usersDetails, setUsersDetails, 
                                    }}
    >
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
