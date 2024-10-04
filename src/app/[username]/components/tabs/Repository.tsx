import { useGlobalContext } from '@/app/Context/store';
import Button from '@/components/shared/Button';
import { RepositoryData } from '@/types';
import { FetchData } from '@/utils/FetchData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdStarOutline } from 'react-icons/io';

const perPage = 8;

// Function to get a random emoji
const emojis = ['🛠️', '🧩', '🌟', '📦', '🔍', '🚀', '🎨', '📈', '💡', '🔧'];
const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const Repository = ({value}: {value: string}) => {
  const { usersDetails: user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [repoData, setRepoData] = useState<RepositoryData[]>([]);
  const totalPages = user.public_repos ? Math.ceil(user.public_repos / perPage) : 1;

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const data = await FetchData(`${user.url}/${value}?page=${page}&per_page=${perPage}`);
        setRepoData(data);
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

  if (repoData.length === 0) {
    return <div className="text-center text-gray-500">No Repository Found!</div>;
  }

  return (
    <div className='flex flex-col gap-6 p-2'>
      <h3 className='text-2xl font-semibold flex items-center gap-2'>
        Projects 📂
      </h3>

      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {repoData.map((repo) => (
            <Link href={`/${repo.full_name}`} key={repo.id}>
              <div key={repo.id} className={`p-8 rounded shadow transition-all hover:scale-105 h-full ${(user.login === repo.name) ? 'bg-[#181918]' : 'bg-[#2e2e2e]'}`}>
                <h4 className='text-xl font-semibold opacity-70 flex justify-between items-center'>
                  <span className='flex items-center'>
                    {getRandomEmoji()} {repo.name}
                  </span>
                  <span className='font-light text-sm flex items-center'>
                    <IoMdStarOutline className='mr-1' /> {repo.stargazers_count}
                  </span>
                </h4>
                <p className='opacity-55 mt-1'>{repo.description}</p>
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

export default Repository;
