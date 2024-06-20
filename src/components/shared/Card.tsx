'use client'

import React, { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'
import Link from 'next/link'
import { CardProps, User } from '@/types/index'
import { FetchData } from '@/actions/FetchData'
import Modal from './Modal'

const Card: React.FC<CardProps> = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<User[] | null>(null);

  const handleOpenModal = async () => {
    setShowModal(true);
    try {
      const url = `https://api.github.com/users/${params[2]}`;
      const response = await FetchData(url);
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
        <div className="text-center text-black">
          {data?.map((user) => (
            <div key={user.id} className="mb-4">
              <p className="font-semibold">User ID: {user.id}</p>
              <p>Username: {user.login}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default Card
