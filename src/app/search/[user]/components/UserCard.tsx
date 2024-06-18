import { trimName } from '@/functions/utils'
import { User } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserCard = ({ user }: { user: User }) => {
  const [id, name, username, followers, location] = [user.id, user.hl_name, user.display_login, user.followers, user.location];
  const img_url = `https://avatars.githubusercontent.com/u/${id}?v=4`;

  return (
    <>
      <div className="md:col-span-1 flex flex-col items-center border p-3 rounded-lg shadow-md">
        <Image src={img_url} alt={username} width={200} height={200} className='rounded-full border' />
        <h2 className="mt-5 text-2xl font-semibold">{trimName(name) || 'No Name'}</h2>
        <p className="text-gray-600">@{username}</p>
        <div className='mt-5 flex justify-around w-full'>
          <div className="text-center">
            <p className="font-semibold">{followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{location || 'Not found'}</p>
            <p className="text-gray-600">Location</p>
          </div>
        </div>
        <div>
          <Link href={`/${username}`} className='border hover:border-none py-2 px-4 mt-4 inline-block bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition transform hover:-translate-y-1 hover:scale-105'>
            Profile Link
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserCard
