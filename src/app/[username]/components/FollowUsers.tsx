'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/shared/Button';
import { useGlobalContext } from '@/app/Context/store';
import { FetchData } from '@/utils/FetchData';
import { FollowData } from '@/types';

const FollowUsers = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { usersDetails: user } = useGlobalContext();
  let totalPages = 1;
  if(tab === 'followers') totalPages = Math.ceil(user["followers"] / 30);
  else if(tab === 'following') totalPages = Math.ceil(user["following"] / 30);

  const [loading, setLoading] = useState(true);
  const [followersData, setFollowersData] = useState<FollowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const data = await FetchData(`${user.url}/${tab}?page=${page}`);
        setFollowersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(currentPage);
  }, [URL, currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (followersData.length === 0) {
    return <div className="text-center text-gray-500">No Followers Found!</div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center text-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10">
        {followersData.map((follower) => (
          <Link href={`/${follower.login}`} key={follower.id}>
            <Image
              src={follower.avatar_url}
              alt={follower.login}
              height={100}
              width={100}
              className="rounded-full mx-auto"
            />
            <p className="mt-2">{follower.login}</p>
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
  );
};

export default FollowUsers;
