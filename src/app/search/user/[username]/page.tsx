import { trimName } from '@/functions/utils';
import { Users } from '@/types';
import Image from 'next/image'
import React from 'react'

const SingleUserPage = async ({ params }: { params: { username: string; } }) => {
  let users: Users | null = null;

  try {
    const response = await fetch(`https://github.com/search?q=${params.username}&type=users`);
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    users = await response.json();
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error}`);
  }

  if (!users) {
    throw new Error('User not found!');
  }
  const user = users.payload['results'][0];
  const [id, name, username, description, followers, location] = [user.id, user.hl_name, user.display_login, user.profile_bio, user.followers, user.location];
  const img_url = `${process.env.IMAGE_URL}/${id}?v=4`;

  return (
    <div className='mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10'>
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">
          {trimName(name)}
        </h2>
        <span className="font-semibold">
          Username: {username}
        </span>
        <p className="mt-5 text-lg leading-8">
          {description}
        </p>
      </div>

      <div className="flex justify-end">
        <Image src={img_url} alt={username} width={0} height={0} className='rounded-md border' style={{ width: 'auto', height: 'auto' }} sizes='100vw' />
      </div>
    </div>
  )
}

export default SingleUserPage
