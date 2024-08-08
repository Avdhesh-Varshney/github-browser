'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import RepoLeft from './components/RepoLeft';
import { FetchData } from '@/utils/FetchData';
import { RepositoryData } from '@/types';
import RepositoryGraph from '@/components/shared/RepositoryGraph';
import { IoBookOutline, IoCodeOutline } from 'react-icons/io5';
import { VscGithubProject, VscGitPullRequest, VscIssues } from 'react-icons/vsc';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdOutlinePlayCircleOutline } from 'react-icons/md';
import Code from './tabs/Code';

const Repository = ({ params }: { params: { username: string, repository: string } }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const [data, setData] = useState<RepositoryData>();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const URL = `${process.env.NEXT_PUBLIC_REPO_URL}/${params.username}/${params.repository}`;
    const fetchData = async () => {
      try {
        const data = await FetchData(URL);
        setData(data);
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

  return (
    <div className="max-w-7xl mx-auto md:px-16 px-6 my-16 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className='md:col-span-1'><RepoLeft data={data} /></div>

        <div className="md:col-span-2">
          <nav className="bg-[#181918] p-1 rounded">
            <div className="relative flex items-center justify-between h-16">

              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex">
                    <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <IoCodeOutline className="mr-2" /> Code
                    </Link>
                    <Link href="?tab=issues" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <VscIssues className="mr-2" /> Issues
                    </Link>
                    <Link href="?tab=pullrequests" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <VscGitPullRequest className="mr-2" /> Pull Requests
                    </Link>
                    <Link href="?tab=discussions" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <GoCommentDiscussion className="mr-2" /> Discussions
                    </Link>
                    <Link href="?tab=actions" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <MdOutlinePlayCircleOutline className="mr-2" /> Actions
                    </Link>
                    <Link href="?tab=projects" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <VscGithubProject className="mr-2" /> Projects
                    </Link>
                    <Link href="?tab=wikis" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                      <IoBookOutline className="mr-2" /> Wiki
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <IoCodeOutline className="mr-2" /> Code
                </Link>
                <Link href="?tab=issues" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <VscIssues className="mr-2" /> Issues
                </Link>
                <Link href="?tab=pullrequests" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <VscGitPullRequest className="mr-2" /> Pull Requests
                </Link>
                <Link href="?tab=discussions" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <GoCommentDiscussion className="mr-2" /> Discussions
                </Link>
                <Link href="?tab=actions" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <MdOutlinePlayCircleOutline className="mr-2" /> Actions
                </Link>
                <Link href="?tab=projects" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <VscGithubProject className="mr-2" /> Projects
                </Link>
                <Link href="?tab=wikis" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <IoBookOutline className="mr-2" /> Wiki
                </Link>
              </div>
            </div>
          </nav>

          {!tab && <Code params={params} />}
        </div>

      </div>

      {!tab && <RepositoryGraph owner={params.username} repo={params.repository} />}
    </div>
  )
}

export default Repository;
