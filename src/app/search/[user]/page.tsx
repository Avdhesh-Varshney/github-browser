'use client'

import SearchForm from '@/components/shared/SearchForm'
import { User, Users } from '@/types';
import React, { Suspense, useEffect, useState } from 'react'
import UserCard from './components/UserCard';
import { FetchData } from '@/actions/FetchData';
import Button from '@/components/shared/Button';
import { useGlobalContext } from '@/app/Context/store';

const SearchPage = ({ params }: { params: { user: string } }) => {
  const type = 'users';
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const { searchUserData, setSearchUserData } = useGlobalContext();

  const getData = async () => {
    let url: string = `https://github.com/search?q=${params.user}&type=${type}&p=${page}`;
    try {
      let data: Users = await FetchData(url);
      setMaxPage(data.payload.page_count);
      let apiUsers = data.payload.results;
      setSearchUserData(apiUsers);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMoreData = async () => {
    let url: string = `https://github.com/search?q=${params.user}&type=${type}&p=${page}`;
    try {
      let data: Users = await FetchData(url);
      setMaxPage(data.payload.page_count);
      let apiUsers = data.payload.results;
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
    <div className="flex flex-col my-10 gap-5 place-items-center">

      <SearchForm />

      <Suspense fallback={'Loading please wait...'}>
        {searchUserData && searchUserData.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2'>
            {searchUserData.map((user: User) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <p className='font-extrabold text-3xl'>No Data Found!</p>
        )}

        <Button text="Load more" onClick={loadMoreData} hidden={(page > maxPage) || (!searchUserData) || (searchUserData.length <= 0)} />
      </Suspense>

    </div>
  )
}

export default SearchPage
