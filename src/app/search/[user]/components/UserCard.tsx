import { trimName } from '@/functions/utils'
import { User } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserCard = ({ user }: { user: User }) => {
  const [id, name, username, description, followers, location] = [user.id, user.hl_name, user.display_login, user.profile_bio, user.followers, user.location];
  const img_url = `${process.env.IMAGE_URL}/${id}?v=4`;

  return (
    <div className='flex gap-5 border p-5 shadow-md rounded'>
      <Image src={img_url} alt={username} width={0} height={0} style={{ width: 'auto', height: '12rem' }} sizes='100vw' />

      <div>
        <h2 className='line-clamp-2 text-xl font-bold text-primary-600 text-balance'>{trimName(name)}</h2>

        <p className='font-bold text-primary-900 mt-1'>{location}</p>

        <p className="font-bold text-primary-900 mt-1">Follower: {followers}</p>

        <p className='block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>{description}</p>

        <Link href={`./user/${username}`} className='py-1 px-2 rounded border border-primary-500 mt-4 inline-block text-primary-500 font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transition'>
          Profile Link
        </Link>

      </div>
    </div>
  )
}

export default UserCard
