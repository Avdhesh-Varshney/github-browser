'use client';

import { FetchData } from '@/utils/FetchData';
import { Repository } from '@/types';
import React, { useState, useEffect } from 'react';
import Card from './components/Card';

const Repos = ({ params }: { params: { username: string; } }) => {
  const [response, setResponse] = useState<Repository[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const url = `https://api.github.com/users/${params.username}/repos?per_page=100`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const initialData: Repository[] | null = await FetchData(url);
        setResponse(initialData);
        if (!initialData || initialData.length < 100) {
          setHasMore(false);
        }
      } catch (error) {
        setError('Error fetching initial data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const loadMoreData = async () => {
    const nextPageURL = `${url}&page=${page + 1}`;

    try {
      const data: Repository[] | null = await FetchData(nextPageURL);

      if (data && data.length > 0) {
        setResponse(prevResponse => (prevResponse ? [...prevResponse, ...data] : data));
        setPage(prevPage => prevPage + 1);
        if (data.length < 100) {
          setHasMore(false);
        }
      } else {
        setError('No more repositories to load');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center my-5 gap-10">
      {/* Owner Repositories Section */}
      <div className='flex flex-col justify-center items-center border-b my-10'>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b-2 border-blue-500 inline-block">
          Owner Repositories
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg shadow-md">
          {response?.filter(repo => !repo.fork).map(repo => (
            <Card key={repo.id} username={params.username} repo={repo} />
          ))}
        </div>
      </div>

      {/* Forked Repositories Section */}
      <div className='flex flex-col items-center justify-center border-b my-10'>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b-2 border-blue-500 inline-block">
          Forked Repositories
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg shadow-md">
          {response?.filter(repo => repo.fork).map(repo => (
            <Card key={repo.id} username={params.username} repo={repo} />
          ))}
        </div>
      </div>

      <button
        className={`bg-white text-black rounded-lg m-5 py-2 px-4 font-semibold border border-black shadow-md transition transform hover:bg-black hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${hasMore ? '' : 'hidden'}`}
        onClick={loadMoreData}
      >
        Load more
      </button>
    </div>
  );
};

export default Repos;
