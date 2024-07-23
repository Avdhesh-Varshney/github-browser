'use client';

import { RepositoryData, User, UserDetails } from "@/types";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;

  repoName: string;
  setRepoName: Dispatch<SetStateAction<string>>;

  repoData: RepositoryData[];
  setRepoData: Dispatch<SetStateAction<RepositoryData[]>>;

  searchUserData: User[];
  setSearchUserData: Dispatch<SetStateAction<User[]>>;

  usersDetails: UserDetails;
  setUsersDetails: Dispatch<SetStateAction<UserDetails>>;
};

export const GlobalContext = createContext<ContextProps>({
  userName: '',
  setUserName: () => {},

  repoName: '',
  setRepoName: () => {},

  repoData: [],
  setRepoData: () => {},

  searchUserData: [],
  setSearchUserData: () => {},

  usersDetails: {} as UserDetails,
  setUsersDetails: () => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string>('');
  const [repoName, setRepoName] = useState<string>('');
  const [repoData, setRepoData] = useState<RepositoryData[]>([]);
  const [searchUserData, setSearchUserData] = useState<User[]>([]);
  const [usersDetails, setUsersDetails] = useState<UserDetails>({} as UserDetails);

  return (
    <GlobalContext.Provider
      value={{
        userName, setUserName,
        repoName, setRepoName,
        repoData, setRepoData,
        searchUserData, setSearchUserData,
        usersDetails, setUsersDetails
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
