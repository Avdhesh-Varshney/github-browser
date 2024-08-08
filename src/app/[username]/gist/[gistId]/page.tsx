'use client';

import { GistResponse } from '@/types';
import { FetchData } from '@/utils/FetchData';
import React, { useEffect, useState } from 'react';

// Icons
import { BsCopy } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};

const Gist = ({ params }: { params: { username: string, gistId: string } }) => {
  const [data, setData] = useState<GistResponse>();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const URL = `${process.env.NEXT_PUBLIC_GIST_URL}/${params.gistId}`;
    const fetchData = async () => {
      try {
        const data = await FetchData(URL);
        setData(data);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) return <p className='text-center text-gray-500 mt-2'>No Data Found!</p>;

  const totalFiles = Object.keys(data.files).length;

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, totalFiles - 1));
  };

  const filenames = Object.keys(data.files);
  const currentFile = filenames[currentIndex];
  const file = data.files[currentFile];

  return (
    <div className="max-w-7xl mx-auto md:px-16 px-6 my-16 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold">{data.description || 'Gist Details'}</h2>

        {totalFiles > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300 ease-in-out transform active:scale-95 focus:outline-nonedisabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous file"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === totalFiles - 1}
              className="p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300 ease-in-out transform active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next file"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* File content display */}
      <div className="p-2">
        <h3 className="text-2xl font-semibold mb-1 truncate">{currentFile}</h3>
        <div className="flex flex-wrap gap-4 text-end justify-end items-end">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-400">Type:</span>
            <span className="text-gray-200">{file.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-400">Language:</span>
            <span className="text-gray-200">{file.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-400">Size:</span>
            <span className="text-gray-200">{file.size} bytes</span>
          </div>
        </div>

        {file.truncated ? (
          <p className="text-red-500">Content is too large to display.</p>
        ) : file.content ? (
          <pre className="border border-gray-700 p-4 rounded-md overflow-x-auto relative">
            <button onClick={() => handleCopy(file.content || '')}
              className="absolute top-2 right-2 p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300 ease-in-out transform active:scale-95 focus:outline-none"
              aria-label="Copy code"
            >
              <BsCopy />
            </button>
            <code>{file.content}</code>
          </pre>
        ) : (
          <a href={file.raw_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View raw file
          </a>
        )}
      </div>
    </div>
  )
}

export default Gist;
