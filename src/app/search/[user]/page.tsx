import SearchForm from '@/components/shared/SearchForm'
import { User, Users } from '@/types';
import React, { Suspense } from 'react'
import UserCard from './components/UserCard';

const MultiUserPage = async ({ params }: { params: { user: string } }) => {
  const response = await fetch(`${process.env.BACKEND_URL}${params.user}&type=users`, {
    next: {
      revalidate: 10800,
    },
  });
  if (!response.ok) {
    throw new Error('An error occurred while fetching the books');
  }
  const usersData = await response.json();

  return (
    <div className="flex min-h-screen flex-col items-center p-20">
      <SearchForm />
      <Suspense fallback={'Loading please wait...'}>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto my-10 justify-center'>
          {
            usersData.payload.results.map((user: User) => (
              <UserCard key={user.id} user={user} />
            ))
          }
        </div>
      </Suspense>
    </div>
  )
}

export default MultiUserPage
