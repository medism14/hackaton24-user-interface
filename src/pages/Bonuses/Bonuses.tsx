import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, ModalAdd, Card } from '../../components';

interface Bonus {
  id: number;
  user_id: number;
  user_name: string;
  bonus_type: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

const mockBonuses: Bonus[] = [
  {
    id: 1,
    user_id: 1,
    user_name: 'Jean Dupont',
    bonus_type: 'Performance',
    amount: 2500,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 2,
    user_id: 2, 
    user_name: 'Marie Martin',
    bonus_type: 'Fin d\'année',
    amount: 1500,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 3,
    user_id: 3,
    user_name: 'Pierre Durant',
    bonus_type: 'Objectifs',
    amount: 3000,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  }
];

const Bonuses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bonuses, setBonuses] = useState<Bonus[]>(mockBonuses);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBonuses = bonuses.filter(bonus =>
    bonus.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bonus.bonus_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des Primes</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une prime..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark focus:outline-none focus:border-primary dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBonuses.map((bonus) => (
          <Card
            key={bonus.id}
            title={bonus.user_name}
            onEdit={() => {}}
            onDelete={() => {}}
            lastUpdated={bonus.updated_at}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">{bonus.bonus_type}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Montant:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{bonus.amount.toLocaleString()} €</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Attribué le: {new Date(bonus.created_at).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter une prime"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Employé
            </label>
            <Input
              name="user_name"
              type="text"
              placeholder="Sélectionnez un employé"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de prime
            </label>
            <Input
              name="bonus_type"
              type="text"
              placeholder="Entrez le type de prime"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Montant
            </label>
            <Input
              name="amount"
              type="number"
              placeholder="Entrez le montant"
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Bonuses;