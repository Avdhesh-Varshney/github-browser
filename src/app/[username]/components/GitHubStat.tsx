import React from 'react';
import { useGlobalContext } from '@/app/Context/store';

const GithubStat = () => {
  const { userName } = useGlobalContext();

  return (
    <div className="flex flex-col gap-3">
      <img
        src={`https://github-profile-trophy.vercel.app/?username=${userName}&theme=onestar&no-frame=true&margin-w=5&margin-h=5&row=2&column=5`}
        alt='GitHub Trophies'
        className="w-full"
      />
      <img
        src={`https://github-readme-streak-stats.herokuapp.com/?user=${userName}&theme=nightowl&hide_border=true&fire=DD2727`}
        alt="GitHub Streak Counter"
        className="w-full"
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 h-full md:h-128">
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs?username=${userName}&color=0e75b6&style=flat&theme=radical&hide_border=true`}
            alt="GitHub Top Languages"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 h-full md:h-128">
          <img
            src={`https://github-contributor-stats.vercel.app/api?username=${userName}&limit=10&theme=radical&combine_all_yearly_contributions=true&hide_border=true`}
            alt="Contributor Stats"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${userName}&theme=2077`}
            alt="Profile Stats"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${userName}&theme=2077`}
            alt="Top Languages by Commit"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full md:w-1/2">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${userName}&theme=2077`}
            alt="Top Languages by Repo"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${userName}&theme=2077`}
            alt="Productive Time"
            className="w-full h-auto"
          />
        </div>
      </div>

      <img
        src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${userName}&theme=2077`}
        alt="Profile Details"
        className="w-full"
      />
    </div>
  );
};

export default GithubStat;
