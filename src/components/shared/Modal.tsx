import { ModalProps } from '@/types';
import React from 'react';
import { MdClose } from 'react-icons/md';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="bg-white shadow-md rounded-lg text-left">
          <div className="flex items-start justify-between p-5 border-b border-black rounded-t">
            <h3 className="text-xl font-semibold text-black">{title}</h3>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
              <span className="sr-only">Close</span>
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-96">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
