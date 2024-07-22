'use client';

import React from 'react'
import { FaCopy } from 'react-icons/fa';

interface CopyCardProps {
  value: string;
  name: string;
}

const CopyCard: React.FC<CopyCardProps> = ({ value, name }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        console.log(`${value} copied to clipboard`);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="rounded-md bg-[#12151e] p-4 inline-flex items-center gap-4 shadow-lg">
      <span className="text-white">{name}</span>
      <button onClick={handleCopy} className="p-2 bg-blue-500 text-white rounded">
        <FaCopy />
      </button>
    </div>
  )
}

export default CopyCard
