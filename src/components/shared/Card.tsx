import Link from 'next/link'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'

const Card = ({params}: {params: [string, string | number, string | null]}) => {
  return (
    <div className='rounded-md bg-[#12151e] p-4 inline-flex items-center gap-4 shadow-lg'>
      <p className='flex flex-col text-center'>
        <span className='text-white font-semibold'>{params[1]}</span>
        <span className='text-[#6c7293] text-sm'>{params[0]}</span>
      </p>
      {params[2] && 
        <Link href={params[2]}>
          <span className="ml-auto flex items-center justify-center bg-[#292f3e] text-white rounded-full p-2 hover:bg-[#3a435a] transition duration-300 ease-in-out">
            <MdArrowOutward size={24} />
          </span>
        </Link>
      }
    </div>
  )
}

export default Card
