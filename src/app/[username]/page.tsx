'use client';

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/store';
import { FetchData } from '@/utils/FetchData';

import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

const SingleUserPage = ({ params }: { params: { username: string } }) => {
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
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <LeftBar />
        <RightBar />
      </div>
    </div>
  );
};

export default SingleUserPage;
