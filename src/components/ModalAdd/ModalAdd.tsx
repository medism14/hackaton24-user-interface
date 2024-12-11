import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalAdd: React.FC<ModalAddProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg mx-auto my-6 z-50">
        <div className="relative flex flex-col w-full bg-white dark:bg-boxdark rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-stroke dark:border-strokedark">
            <h3 className="text-xl font-medium text-black dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 ml-auto text-black dark:text-white hover:text-meta-1 dark:hover:text-meta-1 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="relative p-6 flex-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 p-4 border-t border-stroke dark:border-strokedark">
            <button
              className="px-6 py-2 text-sm font-medium text-black dark:text-white hover:text-meta-1 dark:hover:text-meta-1 transition-colors"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-opacity-90 rounded-lg transition-colors"
              onClick={onClose}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
