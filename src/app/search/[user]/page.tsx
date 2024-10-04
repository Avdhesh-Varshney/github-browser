'use client'
import React, { Suspense, useEffect, useState } from 'react';

import Button from '@/components/shared/Button';
import SearchForm from '@/components/shared/SearchForm';
import UserCard from './components/UserCard';
import { User, Users } from '@/types';
import { FetchData } from '@/utils/FetchData';
import { useGlobalContext } from '@/app/Context/store';

const SearchPage = ({ params }: { params: { user: string } }) => {
  const type = 'users';
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const { searchUserData, setSearchUserData } = useGlobalContext();

  const getData = async () => {
    let url: string = `https://api.github.com/search/${type}?q=${params.user}&page=${page}`;
    try {
      let data: Users = await FetchData(url);
      setMaxPage(data.total_count);
      let apiUsers = data.items;
      setSearchUserData(apiUsers);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const loadMoreData = async () => {
    let url: string = `https://api.github.com/search/${type}?q=${params.user}&page=${page}`;
    try {
      let data: Users = await FetchData(url);
      setMaxPage(data.total_count);
      let apiUsers = data.items;
      setSearchUserData(prevUsersData => [...prevUsersData, ...apiUsers]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col my-10 gap-10 justify-center">
      <h1 className='text-5xl text-center font-bold text-gray-800 dark:text-gray-200'>GitHub Browser</h1>

      <SearchForm text='Username' />

      <Suspense fallback={'Loading please wait...'}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4'>
          {searchUserData.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </Suspense>

      <Button
        text="Load more"
        onClick={loadMoreData}
        hidden={(page > maxPage) || (!searchUserData) || (searchUserData.length <= 0)}
      />
    </div>
  )
}

export default SearchPage;
