import { trimName } from '@/utils/Functions';
import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserCard = ({ user }: { user: User }) => {
  const [id, name, username, followers, location] = [user.id, user.hl_name, user.display_login, user.followers, user.location];
  const img_url = `https://avatars.githubusercontent.com/u/${id}?v=4`;

  return (
    <div className="md:col-span-1 flex flex-col items-center p-5 rounded-lg shadow-lg bg-[#202021]/30 backdrop-blur-md border border-gray-600 transform transition-transform hover:scale-105">
      <Image
        src={img_url}
        alt={username}
        width={200}
        height={200}
        className="rounded-full border-4 border-gray-700"
      />

      <h2 className="mt-5 text-center text-2xl font-bold text-white">{trimName(name) || 'No Name'}</h2>

      <p className="text-gray-400">@{username}</p>

      <div className="mt-5 flex justify-around w-full">
        <div className="text-center">
          <p className="font-bold text-white">{followers}</p>
          <p className="text-gray-400">Followers</p>
        </div>

        <div className="text-center">
          <p className="font-bold text-white">{location || 'Not found'}</p>
          <p className="text-gray-400">Location</p>
        </div>
      </div>

      <div className="mt-auto w-full text-center">
        <Link href={`/${username}`} className="inline-block mt-5 rounded py-2 px-4 bg-[#484646]/70 text-white font-semibold hover:bg-[#616060] transition-colors duration-300">
          Profile Link
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
