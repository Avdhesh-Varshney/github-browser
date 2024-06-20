'use client'

import SearchForm from '@/components/shared/SearchForm'
import { User, Users } from '@/types';
import React, { Suspense, useEffect, useState } from 'react'
import UserCard from './components/UserCard';
import { FetchData } from '@/actions/FetchData';

const MultiUserPage = ({ params }: { params: { user: string } }) => {
  const type = 'users';
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [usersData, setUsersData] = useState<User[]>([]);

  const getData = async () => {
    let url: string = `https://github.com/search?q=${params.user}&type=${type}&p=${page}`;
    try {
      let data: Users = await FetchData(url);
      setMaxPage(data.payload.page_count);
      let apiUsers = data.payload.results;
      setUsersData(apiUsers);
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
      setUsersData(prevUsersData => [...prevUsersData, ...apiUsers]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center lg:p-20 gap-5">
      <SearchForm />

      <Suspense fallback={'Loading please wait...'}>
        {
          usersData && usersData.length > 0 ? (
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto my-10 justify-center'>
              {
                usersData.map((user: User) => (
                  <UserCard key={user.id} user={user} />
                ))
              }
            </div>
          ) : (
            <p className='font-extrabold text-3xl'>No Data Found!</p>
          )
        }

        <button
          className={`${page > maxPage ? 'hidden' : ''} bg-white text-black rounded-lg mb-5 py-2 px-4 font-semibold border border-black shadow-md transition transform hover:bg-black hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
          onClick={loadMoreData}
        >
          Load more
        </button>
      </Suspense>

    </div>
  )
}

export default MultiUserPage
