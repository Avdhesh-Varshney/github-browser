import { ButtonProps } from '@/types';
import React from 'react';

const Button: React.FC<ButtonProps> = ({ text, onClick, hidden = false }) => {
  if (hidden) return null;

  return (
    <button
      className='bg-[#181918] text-white rounded py-2 px-6 border border-gray-600 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#282828] active:bg-[#3a3a3a]'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
