'use client';

import { RepositoryContent } from '@/types';
import { FetchData } from '@/utils/FetchData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';

const Code = ({ params }: { params: { username: string, repository: string } }) => {
  const [data, setData] = useState<RepositoryContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = `${process.env.NEXT_PUBLIC_REPO_URL}/${params.username}/${params.repository}/contents`;
    const fetchData = async () => {
      try {
        const data = await FetchData(URL);
        const sortedData = data.sort((a: RepositoryContent, b: RepositoryContent) => {
          if (a.type === b.type) {
            return a.name.localeCompare(b.name);
          }
          return a.type === 'dir' ? -1 : 1;
        });
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.username, params.repository]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (!data.length) {
    return <p className="text-center text-gray-500 mt-5">No Data Found!</p>;
  }

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <h3 className="ps-4 text-2xl text-gray-500">Content of {params.repository} Repository 📂</h3>
      <div className="p-4 grid grid-cols-2 gap-4 items-center align-middle justify-center">
        {data.map((file) => (
          <div key={file.sha} className="flex items-center gap-4 p-2 duration-200 border border-gray-600 rounded transition-all hover:scale-105">
            <Link href={file.download_url || file.html_url} className="flex justify-between w-full">
              {file.download_url ? (
                <>
                  <span className='flex items-center'>
                    <FaFile className="text-blue-500 mr-1" /> {file.name}
                  </span>
                  <span>{Math.ceil(file.size / 1024)} MB</span>
                </>
              ) : (
                <span className='flex items-center'>
                  <FaFolder className="text-yellow-500 mr-1" /> {file.name}
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Code;
