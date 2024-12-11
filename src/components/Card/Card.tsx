import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  lastUpdated?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  onEdit,
  onDelete,
  lastUpdated,
  children
}) => {
  return (
    <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          {onEdit && (
            <button 
              onClick={onEdit}
              className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {children}

        {lastUpdated && (
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dernière mise à jour: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;