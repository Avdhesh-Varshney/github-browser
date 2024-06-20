import { UserDetails } from '@/types';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from '@/components/shared/Card';
import { formatDate } from '@/functions/utils';
import { FaUserCheck, FaUserShield } from 'react-icons/fa';

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
          <div className="p-5 rounded-lg shadow flex flex-col gap-4">

            {/* User Details Card */}
            {(email || location || company || blog || bio) &&
              <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
                <div className="relative">
                  <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">User Details</h3>
                  {hireable &&
                    <span className='absolute top-0 right-0 mt-1 mr-2 flex items-center gap-1 border-green-500 rounded-lg px-2 py-1 text-sm bg-green-600 text-white' title='Hire Me'>
                      <FaUserCheck className='text-lg' />
                    </span>
                  }
                  {(params.username === 'Avdhesh-Varshney') &&
                    <span className='absolute top-0 right-10 mt-1 mr-2 flex items-center gap-1 border-yellow-500 rounded-lg px-2 py-1 text-sm bg-yellow-600 text-white' title='Site Admin'>
                      <FaUserShield className='text-lg' />
                    </span>
                  }
                </div>

                <div className="space-y-2 space-x-2">
                  {email && <Card params={["Email", email, `mailto:${email}`, true]} />}
                  {location && <Card params={["Location", location, null, false]} />}
                  {company && <Card params={["Company/Organization", company, null, false]} />}
                  {blog && <Card params={["Portfolio", blog, blog, true]} />}
                  {bio && <Card params={["Description", bio, null, false]} />}
                </div>
              </div>
            }

            {/* Account Details Card */}
            <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
              <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">Account Details</h3>

              <div className="space-y-2 space-x-2">
                {created_at && <Card params={['A/C Created On', formatDate(created_at), null, false]} />}
                {updated_at && <Card params={['A/C Updated On', formatDate(updated_at), null, false]} />}

                {followers > 0 && <Card params={['Followers', followers, `${params.username}/followers`, true]} />}
                {following > 0 && <Card params={['Following', following, `${params.username}/following`, true]} />}
                {public_repos > 0 && <Card params={['Repositories', public_repos, `${params.username}/repos`, false]} />}
                {public_gists > 0 && <Card params={['Gists', public_gists, `${params.username}/gists`, false]} />}

                <Card params={['', 'Recent Events', `${params.username}/events`, false]} />
                <Card params={['', 'Recent Notifications', `${params.username}/notifications`, false]} />
                <Card params={['', 'Organizations', `${params.username}/organizations`, false]} />
                <Card params={['', 'Subscriptions', `${params.username}/subscriptions`, false]} />
                <Card params={['', 'Starred Repos', `${params.username}/starred`, false]} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleUserPage
