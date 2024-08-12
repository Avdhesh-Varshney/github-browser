import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/app/Context/store';
import { NotificationData } from '@/types';
import { FetchData } from '@/utils/FetchData';
import Button from '@/components/shared/Button';
import { FaCodeFork, FaCodePullRequest } from 'react-icons/fa6';
import { FaCodeBranch } from 'react-icons/fa';
import { GoEye, GoIssueOpened } from 'react-icons/go';
import Link from 'next/link';

const perPage = 20;

const Event = () => {
  const { usersDetails: user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [notificationData, setNotificationData] = useState<NotificationData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const data = await FetchData(`${user.received_events_url}`);
        setNotificationData(data);
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

  const totalPages = Math.ceil(notificationData.length / perPage);
  const currentNotifications = notificationData.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (notificationData.length === 0) {
    return <div className="text-center text-gray-500">No Notification Found!</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-2">
      <h3 className="text-2xl font-semibold flex items-center gap-2">Notifications 🔔</h3>

      <div className='flex flex-col items-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentNotifications.map((notification, index) => (
            <Link key={index} href={notification.payload.pull_request?.html_url || notification.payload.issue?.html_url || "#"} >
              <div className="p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 h-full bg-[#2e2e2e] text-white relative">
                <div className="absolute -top-4 -left-4">
                  <img className="h-10 w-10 rounded-full border-2 border-white shadow-lg"
                    src={notification.actor.avatar_url} alt={notification.actor.login} />
                </div>
                <div className="absolute -top-1 left-8">
                  {('pull_request' in notification.payload) && <FaCodePullRequest className="text-sm text-[#2196F3] glow" />}
                  {('issue' in notification.payload) && <GoIssueOpened className="text-sm text-[#F44336] glow" />}
                  {notification.type === "PushEvent" && <FaCodeBranch className="text-sm text-[#673AB7] glow" />}
                  {notification.type === "ForkEvent" && <FaCodeFork className="text-sm text-[#FF5722] glow" />}
                  {notification.type === "WatchEvent" && <GoEye className="text-sm text-[#FFEB3B] glow" />}
                </div>
                <div className="flex items-start pl-5">
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-400">{notification.payload.issue?.title || notification.payload.pull_request?.title}</p>
                    <p className="text-sm text-gray-400">{notification.repo.name}</p>
                    <p className="text-sm text-gray-400">{new Date(notification.created_at).toLocaleString()}</p>
                  </div>
                </div>
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

export default Event;
