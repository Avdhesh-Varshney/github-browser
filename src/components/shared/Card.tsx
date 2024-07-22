'use client'

// False -> Don't open the Modal
// True -> Open the Modal

import React, { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'
import Link from 'next/link'
import { CardProps, FollowerDetails } from '@/types/index'
import { FetchData } from '@/utils/FetchData'
import Modal from './Modal'
import Image from 'next/image'
import Button from '@/components/shared/Button'

const Card: React.FC<CardProps> = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<FollowerDetails[] | null>(null);

  const handleOpenModal = async () => {
    setShowModal(true);
    if (!params[2]) return null;
    try {
      const response = await FetchData(params[2]);
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className='rounded-md bg-[#12151e] p-4 inline-flex items-center gap-4 shadow-lg'>
      <p className='flex flex-col text-center'>
        <span className='text-white font-semibold'>{params[1]}</span>
        <span className='text-[#6c7293] text-sm'>{params[0]}</span>
      </p>

      {params[2] &&
        (params[3] ?
          <button
            onClick={handleOpenModal}
            className="ml-auto flex items-center justify-center bg-[#292f3e] text-white rounded-full p-2 hover:bg-[#3a435a] transition duration-300 ease-in-out"
          >
            <MdArrowOutward size={24} />
          </button> :

          <Link href={params[2]}>
            <span className="ml-auto flex items-center justify-center bg-[#292f3e] text-white rounded-full p-2 hover:bg-[#3a435a] transition duration-300 ease-in-out">
              <MdArrowOutward size={24} />
            </span>
          </Link>
        )
      }

      <Modal isOpen={showModal} onClose={handleCloseModal} title={params[0]}>
        {data?.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg shadow-md">
            <div className="flex-shrink-0 w-16 h-16">
              <Image src={user.avatar_url} width={64} height={64} sizes='100vw' alt={user.login} />
            </div>
            <div className="flex-grow text-black">
              <p>Username: {user.login}</p>
              <Button text='GitHub URL' onClick={() => window.open(user.html_url, '_blank')} />
            </div>
          </div>
        ))}
      </Modal>
    </div>
  )
}

export default Card
