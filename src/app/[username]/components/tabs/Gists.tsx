import { useGlobalContext } from '@/app/Context/store';
import Button from '@/components/shared/Button';
import { GistResponse } from '@/types';
import { FetchData } from '@/utils/FetchData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const perPage = 8;

function fetchAllFilesLanguages(files: any): string {
  const languagesSet = new Set<string>();
  for (const file in files) {
    if (files[file].language) {
      languagesSet.add(files[file].language);
    }
  }
  return Array.from(languagesSet).join(', ');
}

const Gists = () => {
  const { usersDetails: user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [gistData, setGistData] = useState<GistResponse[]>([]);
  const totalPages = user.public_gists ? Math.ceil(user.public_gists / perPage) : 1;

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const data = await FetchData(`${user.url}/gists?page=${page}&per_page=${perPage}`);
        setGistData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (gistData.length === 0) {
    return <div className="text-center text-gray-500">No Gist Found!</div>;
  }

  return (
    <div className='flex flex-col gap-6 p-2'>
      <h3 className='text-2xl font-semibold flex items-center gap-2'>
        Gists 📝
      </h3>

      <div className="flex flex-col items-center">
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {gistData.map((gist) => (
            <Link href={`/${user.login}/gist/${gist.id}`} key={gist.id}>
              <div key={gist.id} className="p-8 rounded shadow transition-all hover:scale-105 h-full bg-[#2e2e2e]">
                <h3 className="text-xl font-semibold">{gist.description}</h3>
                <p className="text-gray-600">{fetchAllFilesLanguages(gist.files)}</p>
                <p className="text-gray-600">{Object.keys(gist.files).length} files in it.</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            text="Previous"
            onClick={handlePrevious}
            hidden={currentPage === 1}
          />
          <Button
            text="Next"
            onClick={handleNext}
            hidden={currentPage === totalPages}
          />
        </div>
      </div>

    </div>
  )
}

export default Gists;
