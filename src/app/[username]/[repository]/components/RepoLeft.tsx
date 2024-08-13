import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RepositoryData } from '@/types';
import { formatDate } from '@/utils/Functions';

// Icons
import { DiMitlicence } from 'react-icons/di';
import { GoRepoPush } from 'react-icons/go';
import { HiOutlineDatabase, HiOutlineLink } from 'react-icons/hi';
import { HiOutlineBellAlert, HiOutlineLanguage } from 'react-icons/hi2';
import { IoMdStarOutline } from 'react-icons/io';
import { IoGitBranchOutline } from 'react-icons/io5';
import { MdOutlineSystemUpdateAlt, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { PiGitFork } from 'react-icons/pi';
import { TbLicense } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';

const RepoLeft = ({ data }: { data: RepositoryData }) => {
  return (
    <div className='flex flex-col'>
      <div className="relative mx-auto">
        <Image src={'/repo.png'} alt='repo-img' width={600} height={600} sizes='100vh' className='rounded shadow p-4 bg-[#181918]' />
        {(data.private) ? (
          <span className='absolute bottom-5 right-5 flex items-center gap-1 border-green-500 rounded-lg px-2 py-1 text-sm bg-green-600 text-white z-50' title={data.visibility}>
            <MdOutlineVisibilityOff className='text-lg' />
          </span>
        ) : (
          <span className='absolute bottom-5 right-5 flex items-center gap-1 border-red-500 rounded-lg px-2 py-1 text-sm bg-green-600 text-white z-50' title={data.visibility}>
            <MdOutlineVisibility className='text-lg' />
          </span>
        )}
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.name}</h2>
      <Link href={data.html_url || "#"}><p className="text-gray-600 text-lg">/{data.full_name}</p></Link>
      <p className='my-4'>{data.description}</p>

      <p className='flex flex-col items-center p-2 rounded-lg border bg-[#181918]'>RepoID - {data.id}</p>

      <p className="flex my-4 gap-1 items-center mx-auto">
        <Link href="?tab=stargazers" className="flex items-center">
          <IoMdStarOutline className='mr-1' />
          <span>{data.stargazers_count}</span>
          <span className="ml-1 text-gray-600">stars</span>
        </Link>
        {data.forks ? (<>
          <span className="mx-2">·</span>
          <Link href="?tab=forks" className='flex items-center'>
            <PiGitFork className='mr-1' />
            <span>{data.forks_count}</span>
            <span className="ml-1 text-gray-600">forks</span>
          </Link>
        </>
        ) : <></>}
        <span className="mx-2">·</span>
        <Link href="?tab=subscribers" className='flex items-center'>
          <HiOutlineBellAlert className='mr-1' />
          <span>{data.subscribers_count}</span>
          <span className="ml-1 text-gray-600">subscribers</span>
        </Link>
      </p>

      <div className="flex flex-col border-t-2 mt-4 pt-4 gap-2">
        {data.created_at && 
        <p className='flex gap-2 items-center'>
          <VscAccount /> <span className="text-gray-600">Created At </span> {formatDate(data.created_at)}
        </p>}
        {data.updated_at && 
        <p className="flex gap-2 items-center">
          <MdOutlineSystemUpdateAlt /> <span className="text-gray-600">Updated At </span> {formatDate(data.updated_at)}
        </p>}
        {data.pushed_at && 
        <p className="flex gap-2 items-center">
          <GoRepoPush /> <span className="text-gray-600">Pushed At </span> {formatDate(data.pushed_at)}
        </p>}
        {data.size && 
        <p className="flex gap-2 items-center">
          <HiOutlineDatabase /> <span className="text-gray-600">Size </span> {Math.ceil(data.size / 1024)} MB
        </p>}
        <p className="flex gap-2 items-center">
          <HiOutlineLanguage /> <span className="text-gray-600">Language </span> {data.language}
        </p>
        {data.license && <p className='flex gap-2 items-center'>
          {data.license.key === 'mit' ? (<>
            <DiMitlicence /> <span className="text-gray-600">License </span> {data.license.name}
          </>) : data.license.key === '' ? (<>
            <TbLicense /> <span className="text-red-600">No License</span>
          </>) : (<>
            <TbLicense /> <span className="text-gray-600">License </span> {data.license.name}
          </>)}
        </p>}
        <p className="flex gap-2 items-center">
          <IoGitBranchOutline /> <span className="text-gray-600">Default Branch </span> {data.default_branch}
        </p>
      </div>

      <div className="flex flex-col border-t-2 mt-4 pt-4 gap-2">
        <p className="flex gap-2 items-center">
          {data.homepage ? (
            <><HiOutlineLink /> <Link href={data.homepage} target='_blank'>{data.homepage}</Link></>
          ) : <></>}
        </p>
        <p className="flex gap-2 items-center">
          {data.mirror_url ? (
            <><HiOutlineLink /> <Link href={data.mirror_url} target='_blank'>{data.mirror_url}</Link></>
          ) : <></>}
        </p>
        {data.archived ? (
          <p className='flex flex-col items-center p-2 rounded-lg border bg-[#72773f]'>Achieved Repository!</p>
        ) : (<></>)}
        {data.disabled ? (
          <p className='flex flex-col items-center p-2 rounded-lg border bg-[#292929]'>Disabled Repository!</p>
        ) : (<></>)}
      </div>

    </div>
  )
}

export default RepoLeft;
