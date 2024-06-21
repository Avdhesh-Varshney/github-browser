import { UserDetails } from '@/types'
import React from 'react'
import { FaUserCheck, FaUserShield } from 'react-icons/fa'
import Card from '../../../../components/shared/Card'

const UserDetailsCard = ({ user, username }: { user: UserDetails, username: string }) => {
  return (
    <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
      <div className="relative">
        <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">User Details</h3>
        {user.hireable &&
          <span className='absolute top-0 right-0 mt-1 mr-2 flex items-center gap-1 border-green-500 rounded-lg px-2 py-1 text-sm bg-green-600 text-white' title='Hire Me'>
            <FaUserCheck className='text-lg' />
          </span>
        }
        {(username === 'Avdhesh-Varshney') &&
          <span className='absolute top-0 right-10 mt-1 mr-2 flex items-center gap-1 border-yellow-500 rounded-lg px-2 py-1 text-sm bg-yellow-600 text-white' title='Site Admin'>
            <FaUserShield className='text-lg' />
          </span>
        }
      </div>

      <div className="space-y-2 space-x-2">
        {user.email && <Card params={["Email", user.email, `mailto:${user.email}`, true]} />}
        {user.location && <Card params={["Location", user.location, null, false]} />}
        {user.company && <Card params={["Company/Organization", user.company, null, false]} />}
        {user.blog && <Card params={["Portfolio", user.blog, user.blog, true]} />}
        {user.bio && <Card params={["Description", user.bio, null, false]} />}
      </div>
    </div>
  )
}

export default UserDetailsCard
