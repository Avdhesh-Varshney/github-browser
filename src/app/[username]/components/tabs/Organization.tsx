import { useGlobalContext } from '@/app/Context/store';
import Button from '@/components/shared/Button';
import { OrgsData } from '@/types';
import { FetchData } from '@/utils/FetchData';
import React, { useEffect, useState } from 'react'

const perPage = 8;

const Organization = () => {
  const { usersDetails: user } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState<OrgsData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allRepos: OrgsData[] = [];
        let page = 1;
        let fetchedRepos: OrgsData[];
        do {
          fetchedRepos = await FetchData(`${user.url}/orgs?page=${page}&per_page=${perPage}`);
          allRepos = [...allRepos, ...fetchedRepos];
          page++;
        } while (fetchedRepos.length === perPage);
        setOrganizationData(allRepos);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.url]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const totalPages = Math.ceil(organizationData.length / perPage);
  const currentOrgs = organizationData.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (organizationData.length === 0) {
    return <div className="text-center text-gray-500">No Organization Found!</div>;
  }

  return (
    <div className='flex flex-col gap-6 p-2'>
      <h3 className='text-2xl font-semibold flex items-center gap-2'>Organizations 🏢</h3>

      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {currentOrgs.map((org) => (
            <div key={org.id} className='p-8 rounded shadow transition-all hover:scale-105 h-full bg-[#2e2e2e]'>
              <img src={org.avatar_url} alt={org.login} className='w-20 h-20' />
              <h3 className='text-lg font-semibold'>{org.login}</h3>
              <p>{org.description}</p>
            </div>
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

export default Organization;
