'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface Commit {
  commit: {
    author: {
      date: string;
    };
  };
}

interface Contribution {
  date: string;
  count: number;
}

const RepositoryGraph = ({ owner, repo }: { owner: string; repo: string }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const getContributions = async () => {
      const response = await axios.get<Commit[]>(`https://api.github.com/repos/${owner}/${repo}/commits`);
      const commitDates = response.data.map((commit: Commit) => commit.commit.author.date);
      
      const contributionData: { [key: string]: number } = commitDates.reduce((acc, date) => {
        const day = date.split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      
      const contributionArray: Contribution[] = Object.keys(contributionData).map(date => ({
        date,
        count: contributionData[date],
      })).reverse();
      setContributions(contributionArray);
    };
    getContributions();
  }, [owner, repo]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-black p-3 rounded shadow">
          <p className="label">{`Date: ${label}`}</p>
          <p className="intro">{`Commits: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bg-[#2e2e2e] pe-10 py-6 rounded shadow'>
      <h3 className='text-4xl font-semibold pb-2 mb-4 text-center'>Contribution Graph for {repo} Repository</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={contributions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(tick) => tick} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="count" stroke="#39d353" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RepositoryGraph;
