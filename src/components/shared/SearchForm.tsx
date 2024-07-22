'use client';
import React, { useState } from 'react'

const SearchForm = ({text}: {text: string}) => {
  const [userName, setUserName] = useState<string>('');
  const handleOnChange = (e: any) => {
    setUserName(e.target.value);
  }

  return (
    <form action={`/search/${userName}`}>
      <div className="relative">

        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>

        <input
          type="search"
          id="search"
          className="w-full p-4 ps-10 text-sm rounded-lg bg-transparent outline-none border border-gray-600 focus:border-blue-600"
          placeholder={`Search ${text}`}
          onChange={handleOnChange}
          autoComplete='off'
          required
        />

        <button
          id='btn'
          type="submit"
          className="absolute end-2.5 bottom-2.5 bg-[#2f2e2f] hover:bg-[#383738] hover:scale-105 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#2f2e2f] dark:hover:bg-[#383738]"
        >
          Search
        </button>

      </div>
    </form>
  )
}

export default SearchForm;
