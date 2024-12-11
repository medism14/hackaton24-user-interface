import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, ModalAdd, Card } from '../../components';

interface Contract {
  id: number;
  name: string;
  contract_coefficient: number;
  additional_benefits: string;
  created_at: string;
  updated_at: string;
}

const mockContracts: Contract[] = [
  {
    id: 1,
    name: 'CDI',
    contract_coefficient: 1.0,
    additional_benefits: 'Mutuelle, tickets restaurant, RTT',
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 2,
    name: 'CDD',
    contract_coefficient: 1.1,
    additional_benefits: 'Prime de précarité, tickets restaurant',
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 3,
    name: 'Stage',
    contract_coefficient: 0.5,
    additional_benefits: 'Tickets restaurant',
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  }
];

const Contracts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredContracts = contracts.filter(contract =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des Types de Contrats</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un type de contrat..."
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
        {filteredContracts.map((contract) => (
          <Card
            key={contract.id}
            title={contract.name}
            onEdit={() => {}}
            onDelete={() => {}}
            lastUpdated={contract.updated_at}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Coefficient:</span>
              <span className="font-semibold dark:text-white">×{contract.contract_coefficient}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 dark:text-gray-400">Avantages:</span>
              <p className="text-sm font-semibold dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                {contract.additional_benefits}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un type de contrat"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du contrat
            </label>
            <Input
              name="name"
              type="text"
              placeholder="Entrez le nom du contrat"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coefficient du contrat
            </label>
            <Input
              name="contract_coefficient"
              type="number"
              placeholder="Entrez le coefficient du contrat"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Avantages additionnels
            </label>
            <Input
              name="additional_benefits"
              type="text"
              placeholder="Entrez les avantages additionnels"
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Contracts;