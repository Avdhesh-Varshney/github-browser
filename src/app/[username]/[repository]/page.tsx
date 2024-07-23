'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useGlobalContext } from '@/app/Context/store';
import Left from './components/Left';

const Repository = ({ params }: { params: { username: string, repository: string } }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const {repoData} = useGlobalContext();
  const data = repoData.find(r => r.name === params.repository);

  if(!data) return <p className='text-center text-gray-500 mt-2'>No Data Found!</p>;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="max-w-7xl mx-auto md:px-16 px-6 my-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className='md:col-span-1'><Left data={data} /></div>
        {!tab && <div className="md:col-span-2">Hello</div>}
      </div>

    </div>
  )
}

export default Repository;
