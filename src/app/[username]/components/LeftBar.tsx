import React from 'react';
import { useGlobalContext } from '@/app/Context/store';
import Image from 'next/image';
import Link from 'next/link';

// Icons
import { RiGroupLine } from "react-icons/ri";
import { GoLocation, GoOrganization, GoRepo } from "react-icons/go";
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoIosLink } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub, FaUserCheck, FaUserShield } from 'react-icons/fa';
import { VscAccount, VscGistSecret } from 'react-icons/vsc';
import { formatDate } from '@/utils/Functions';
import Button from '@/components/shared/Button';

const LeftBar = () => {
  const { usersDetails: user } = useGlobalContext();

  const handleClick = (path: string) => () => {
    console.log(path);
  };

  return (
    <div className="flex flex-col rounded">

      <div className="relative mx-auto">
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={300}
          height={300}
          className='rounded-full border'
        />
        {user.hireable && (
          <span className='absolute bottom-4 right-10 flex items-center gap-1 border-green-500 rounded-lg px-2 py-1 text-sm bg-green-600 text-white' title='Hire Me'>
            <FaUserCheck className='text-lg' />
          </span>
        )}
        {user.login === 'Avdhesh-Varshney' && (
          <span className='absolute bottom-4 right-0 flex items-center gap-1 border-yellow-500 rounded-lg px-2 py-1 text-sm bg-yellow-600 text-white' title='Site Admin'>
            <FaUserShield className='text-lg' />
          </span>
        )}
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{user.name || 'No Name'}</h2>
      <p className="text-gray-600 text-lg">@{user.login}</p>
      <p className='my-4'>{user.bio}</p>

      <p className='flex flex-col items-center p-2 rounded-lg border bg-[#181918]'>UserID - {user.id}</p>

      <p className="flex my-4 gap-1 items-center">
        <Link href="?tab=followers" className="flex items-center">
          <RiGroupLine className="mr-1" />
          <span className='hover:text-blue-500'>
            {user.followers}
            <span className="ml-1 text-gray-600 hover:text-blue-500">followers</span>
          </span>
        </Link>
        <span className="mx-2">·</span>
        <Link href="?tab=following">
          <span className='hover:text-blue-500'>
            {user.following}
            <span className="ml-1 text-gray-600 hover:text-blue-500">following</span>
          </span>
        </Link>
      </p>

      <div className="flex flex-col gap-2">
        {user.company && <p className='flex gap-1 items-center'><GoOrganization /> {user.company}</p>}
        {user.location && <p className='flex gap-1 items-center'><GoLocation /> {user.location}</p>}
        {user.email && <p className='flex gap-1 items-center'><MdOutlineMailOutline /> {user.email}</p>}
        {user.blog && <Link className='flex gap-1 items-center' href={user.blog} target='_blank' rel="noopener noreferrer"><IoIosLink /> {user.blog}</Link>}
        {user.html_url && <Link className='flex gap-1 items-center' href={user.html_url} target='_blank' rel='noopener noreferrer'><FaGithub /> {user.html_url}</Link>}
        {user.twitter_username && <Link className='flex gap-1 items-center' href={`https://x.com/${user.twitter_username}`} target='_blank' rel="noopener noreferrer"><FaXTwitter /> {user.twitter_username}</Link>}
      </div>

      <div className="flex flex-col border-t-2 mt-4 pt-4 gap-2">
        <p className='flex gap-1 items-center'>
          <VscAccount /> <span className="text-gray-600">Created At </span> {formatDate(user.created_at)}
        </p>
        <p className="flex gap-1 items-center">
          <VscAccount /> <span className="text-gray-600">Updated At </span> {formatDate(user.updated_at)}
        </p>
        <Link href="?tab=repositories">
          <p className="flex gap-1 items-center hover:text-blue-500">
            <GoRepo /> <span className="text-gray-600 hover:text-blue-500">Repositories</span> {user.public_repos}
          </p>
        </Link>
        <Link href="?tab=gists">
          <p className="flex gap-1 items-center hover:text-blue-500">
            <VscGistSecret /> <span className="text-gray-600 hover:text-blue-500">Gists</span> {user.public_gists}
          </p>
        </Link>
      </div>

      <div className="flex flex-col border-t-2 mt-4 pt-4 gap-2">
        <Link href="?tab=stars">
          <button className='bg-[#181918] text-white rounded py-2 px-6 border border-gray-600 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#282828] active:bg-[#3a3a3a] w-full'>
            Starred Repos
          </button>
        </Link>
        <Link href="?tab=subscriptions">
          <button className='bg-[#181918] text-white rounded py-2 px-6 border border-gray-600 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#282828] active:bg-[#3a3a3a] w-full'>
            Subscribed Repos
          </button>
        </Link>
        <Link href="?tab=organizations">
          <button className='bg-[#181918] text-white rounded py-2 px-6 border border-gray-600 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#282828] active:bg-[#3a3a3a] w-full'>
            Organizations
          </button>
        </Link>
        <Button text='Recent Events' onClick={handleClick("events")} />
        <Button text='Recent Notifications' onClick={handleClick("notifications")} />
      </div>

    </div>
  )
}

export default LeftBar;
