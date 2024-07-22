'use client'

import React, { useState } from 'react';
import { useGlobalContext } from '@/app/Context/store';

import GitHubCalendar from 'react-github-calendar';
import YearButton from './YearButton';

export const github: any = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function getGitHubYears(joinYear: number | undefined): number[] {
  if (!joinYear) return [];

  const currentYear = new Date().getFullYear();
  const duration = currentYear - joinYear + 1;
  const years = Array.from({ length: duration }, (_year, i) => currentYear - i);
  return years;
}

const GitHubContributions = () => {
  const { usersDetails: user } = useGlobalContext();
  const [calendarYear, setCalendarYear] = useState<number | undefined>(undefined);
  const createdYear = new Date(user.created_at).getFullYear();
  const today = new Date().getFullYear();
  const years = getGitHubYears(createdYear);
  console.log(years)

  return (
    <>
      <h3 className="text-4xl font-semibold pb-2 mb-4 text-center">Contribution Graph</h3>
      <div className="flex xl:flex-row flex-col gap-4">
        <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
          <GitHubCalendar
            username={user.login}
            theme={github}
            colorScheme="dark"
            blockSize={13}
            year={calendarYear}
          />
        </div>
        <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
          {years.slice(0, 5).map((year) => (
            <YearButton
              key={year}
              year={year}
              currentYear={calendarYear ?? today}
              onClick={() =>
                setCalendarYear(year === calendarYear ? undefined : year)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GitHubContributions;
