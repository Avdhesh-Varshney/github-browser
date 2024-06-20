import { Repository } from '@/types'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

const Card = ({ username, repo }: { username: string, repo: Repository }) => {
  return (
    <div className="relative bg-[#12151e] text-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full gap-2">
      {username === repo.name && (
        <span title='Introductory Repository' className="absolute top-4 right-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
          <FaStar size={24} className="text-white" />
        </span>
      )}
      <div>
        <h2 className="text-2xl font-bold mb-4">{repo.name}</h2>
        {repo.description && <p className="mb-2"><strong>Description</strong><br /> {repo.description}</p>}
      </div>
      <div className="mt-auto flex gap-4">
        <Link href={repo.html_url} className='bg-black text-white font-semibold p-2 rounded-md border hover:bg-white hover:text-black hover:scale-105 transition duration-300' target='_blank'>Repository Link</Link>
        <Link href={`repos/${repo.name}`} className='bg-white text-black font-semibold p-2 rounded-md border hover:bg-black hover:text-white hover:scale-105 transition duration-300'>Explore Repository</Link>
      </div>
    </div>
  )
}

export default Card
