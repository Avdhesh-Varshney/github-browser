import { useGlobalContext } from '@/app/Context/store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LeftBar = () => {
  const { usersDetails: user } = useGlobalContext();

  return (
    <div className="flex flex-col gap-2">

      <div className="md:col-span-1 flex flex-col items-center border p-3 rounded-lg bg-white">
        <Image src={user.avatar_url} alt={user.login} width={200} height={200} className='rounded-full border' />
        <h2 className="mt-5 text-2xl font-semibold text-black">{user.name || 'No Name'}</h2>
        <p className="text-gray-600">@{user.login}</p>
        <div className='mt-5 flex justify-around w-full'>
          <div className="text-center">
            <p className="font-semibold text-black">{user.followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-black">{user.following}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center p-3 rounded-lg border'>
        <p className="text-white">UserID - <span className="text-gray-600 font-semibold">{user.id}</span></p>
      </div>

      <div className='grid grid-cols-2 gap-1'>
        <Link href={user.html_url} target='_blank' rel="noopener noreferrer" className={`inline-block bg-black text-white font-semibold ${!user.twitter_username? 'col-span-2': ''}`}>
          <div className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
            GitHub Profile
          </div>
        </Link>
        {user.twitter_username &&
          <Link href={`https://x.com/${user.twitter_username}`} target='_blank' rel="noopener noreferrer" className="inline-block bg-black text-white font-semibold">
            <div className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
              Twitter Profile
            </div>
          </Link>
        }
      </div>

    </div>
  )
}

export default LeftBar
