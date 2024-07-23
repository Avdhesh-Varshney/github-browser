'use client';

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/store';
import { FetchData } from '@/utils/FetchData';
import ContributionGraph from './components/ContributionGraph';

import LeftBar from './components/LeftBar';
import GithubStat from './components/GitHubStat';
import { useSearchParams } from 'next/navigation';
import FollowUsers from './components/FollowUsers';

const Profile = ({ params }: { params: { username: string } }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const { setUserName, usersDetails, setUsersDetails } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserName(params.username);
    const fetchData = async () => {
      const URL = `https://api.github.com/users/${params.username}`;
      try {
        const data = await FetchData(URL);
        setUsersDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.username, setUserName, setUsersDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(usersDetails).length === 0) {
    return <div>Error: Data is not fetched</div>;
  }

  return (
    <div className="max-w-7xl mx-auto md:px-16 px-6 my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className='md:col-span-1'><LeftBar /></div>
        {!tab && <div className="md:col-span-2"><GithubStat /></div>}
        {tab === "followers" && <div className="md:col-span-2"><FollowUsers /></div>}
        {tab === "following" && <div className="md:col-span-2"><FollowUsers /></div>}
      </div>
      {!tab && <div className="mx-auto mt-20"><ContributionGraph /></div>}
    </div>
  );
};

export default Profile;
