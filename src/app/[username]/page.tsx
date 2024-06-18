import { UserDetails } from '@/types';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleUserPage = async ({ params }: { params: { username: string; } }) => {
  let user: UserDetails | null = null;

  try {
    const response = await fetch(`${process.env.USER_URL}/${params.username}`);
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    user = await response.json();
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error}`);
  }

  if (!user) {
    throw new Error('User not found!');
  }


  /*
  {
    login: 'Avdhesh-Varshney',
    id: 114330097,
    node_id: 'U_kgDOBtCJ8Q',
    avatar_url: 'https://avatars.githubusercontent.com/u/114330097?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Avdhesh-Varshney',
    html_url: 'https://github.com/Avdhesh-Varshney',
    followers_url: 'https://api.github.com/users/Avdhesh-Varshney/followers',
    following_url: 'https://api.github.com/users/Avdhesh-Varshney/following{/other_user}',      
    gists_url: 'https://api.github.com/users/Avdhesh-Varshney/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/Avdhesh-Varshney/starred{/owner}{/repo}',        
    subscriptions_url: 'https://api.github.com/users/Avdhesh-Varshney/subscriptions',
    organizations_url: 'https://api.github.com/users/Avdhesh-Varshney/orgs',
    repos_url: 'https://api.github.com/users/Avdhesh-Varshney/repos',
    events_url: 'https://api.github.com/users/Avdhesh-Varshney/events{/privacy}',
    received_events_url: 'https://api.github.com/users/Avdhesh-Varshney/received_events',       
    type: 'User',
    site_admin: false,
    name: 'Avdhesh',
    company: 'NIT Jalandhar',
    blog: 'https://avdhesh-portfolio.vercel.app',
    location: null,
    email: null,
    hireable: true,
    bio: 'Exploring...',
    twitter_username: '__Avdhesh__',
    public_repos: 51,
    public_gists: 5,
    followers: 48,
    following: 29,
    created_at: '2022-09-25T06:56:15Z',
    updated_at: '2024-06-04T12:27:17Z'
  }
  */

  const {
    login,
    id,
    avatar_url,
    gravatar_id,
    url,
    html_url,
    followers_url,
    following_url,
    gists_url,
    starred_url,
    subscriptions_url,
    organizations_url,
    repos_url,
    events_url,
    received_events_url,
    type,
    site_admin,
    name,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    twitter_username,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at
  } = user;

  return (
    <div className='mx-auto max-w-6xl px-5 py-10'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-2">
          <div className="md:col-span-1 flex flex-col items-center border p-3 rounded-lg bg-white">
            <Image src={avatar_url} alt={login} width={200} height={200} className='rounded-full border' />
            <h2 className="mt-5 text-2xl font-semibold text-black">{name || 'No Name'}</h2>
            <p className="text-gray-600">@{login}</p>
            <div className='mt-5 flex justify-around w-full'>
              <div className="text-center">
                <p className="font-semibold text-black">{followers}</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-black">{following}</p>
                <p className="text-gray-600">Following</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center p-3 rounded-lg border'>
            <p className="text-white">UserID - <span className="text-gray-600 font-semibold">{id}</span></p>
          </div>
          <div className='grid grid-cols-2 gap-1'>
            <Link href={html_url} target='_blank' rel="noopener noreferrer" className="inline-block bg-black text-white font-semibold">
              <div className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
                GitHub Profile
              </div>
            </Link>
            <Link href={`https://x.com/${twitter_username}`} target='_blank' rel="noopener noreferrer" className="inline-block bg-black text-white font-semibold">
              <div className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
                Twitter Profile
              </div>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold border-b border-blue-50 inline-block">User Details</h3>
            {email && <p className="mt-2 text-lg"><span className="text-gray-600">Email:</span> {email}</p>}
            {location && <p className="mt-2 text-lg"><span className="text-gray-600">Location:</span> {location}</p>}
            {company && <p className="mt-2 text-lg"><span className="text-gray-600">Company/Organization:</span> {company}</p>}
            {blog && <p className="mt-2 text-lg"><span className="text-gray-600">Blog URL:</span> {blog}</p>}
            {bio && <p className="mt-2 text-lg"><span className="text-gray-600">Bio:</span> {bio}</p>}

            <h3 className="text-xl font-semibold border-b border-blue-50 inline-block mt-5">Account Details</h3>
            {created_at && <p className="mt-2 text-lg"><span className="text-gray-600">A/C Created at:</span> {created_at}</p>}
            {updated_at && <p className="mt-2 text-lg"><span className="text-gray-600">A/C Updated at:</span> {updated_at}</p>}
            <p className="mt-2 text-lg">
              <span className="text-gray-600">List of Followers:</span>
              <Link href={`${params.username}/followers`}>Followers List</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">List of Following:</span>
              <Link href={`${params.username}/following`}>Following List</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Public Repos:</span> {public_repos}
              <Link href={`${params.username}/repos`}>Explore Repositories</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Public Gists:</span> {public_gists}
              <Link href={`${params.username}/gists`}>Explore Gists</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Recent events on Profile:</span>
              <Link href={`${params.username}/events`}>Explore events</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Notifications on Profile:</span>
              <Link href={`${params.username}/notifications`}>Notifications</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Organizations List:</span>
              <Link href={`${params.username}/organizations`}>Organizations</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Subscriptions List:</span>
              <Link href={`${params.username}/subscriptions`}>Subscriptions</Link>
            </p>
            <p className="mt-2 text-lg">
              <span className="text-gray-600">Starred Repository List:</span>
              <Link href={`${params.username}/starred`}>Starred Repos</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserPage
