'use client';
import React, { useState } from 'react'

const SearchForm = () => {
  const [userName, setUserName] = useState<string>('');
  const handleOnChange = (e: any) => {
    setUserName(e.target.value);
  }

  return (
    <form className='max-w-[800px] min-w-[350px]' action={`/search/${userName}`}>
      <div className="relative">

        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>

        <input
          type="search"
          id="search"
          className="w-full outline-none p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search Username"
          onChange={handleOnChange}
          required
        />

        <button
          id='btn'
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 hover:scale-105 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>

      </div>
    </form>
  )
}

export default SearchForm
