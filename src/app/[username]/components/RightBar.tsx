import React from 'react'
import Card from '../../../components/shared/Card'
import { formatDate } from '@/functions/utils'
import UserDetailsCard from './shared/UserDetailsCard'
import { useGlobalContext } from '@/app/Context/store'

const RightBar = () => {
  const {userName, usersDetails: user} = useGlobalContext();

  return (
    <div className="md:col-span-2">
      <div className="rounded-lg shadow flex flex-col gap-4">

        {/* User Details Card */}
        {(user.email || user.location || user.company || user.blog || user.bio) &&
          <UserDetailsCard user={user} username={userName} />
        }

        {/* Account Details Card */}
        <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
          <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">Account Details</h3>

          <div className="space-y-2 space-x-2">
            <Card params={['A/C Created On', formatDate(user.created_at), null, false]} />
            <Card params={['A/C Updated On', formatDate(user.updated_at), null, false]} />

            {user.followers > 0 && <Card params={['Followers', user.followers, `${userName}/followers`, true]} />}
            {user.following > 0 && <Card params={['Following', user.following, `${userName}/following`, true]} />}
            {user.public_repos > 0 && <Card params={['Repositories', user.public_repos, `${userName}/repos`, false]} />}
            {user.public_gists > 0 && <Card params={['Gists', user.public_gists, `${userName}/gists`, false]} />}

            <Card params={['', 'Recent Events', `${userName}/events`, false]} />
            <Card params={['', 'Recent Notifications', `${userName}/notifications`, false]} />
            <Card params={['', 'Organizations', `${userName}/organizations`, false]} />
            <Card params={['', 'Subscriptions', `${userName}/subscriptions`, false]} />
            <Card params={['', 'Starred Repos', `${userName}/starred`, false]} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default RightBar;
