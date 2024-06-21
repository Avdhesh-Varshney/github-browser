import { ButtonProps } from '@/types';
import React from 'react'

const Button: React.FC<ButtonProps> = ({ text, onClick, hidden = false }) => {
  if (hidden) return null;

  return (
    <button
      className='bg-white text-black rounded-lg py-2 px-4 font-semibold border transition-duration-300 hover:bg-black hover:text-white hover:scale-105 focus:outline-none'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button
