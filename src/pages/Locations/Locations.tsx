import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, ModalAdd, Card } from '../../components';

interface Location {
  id: number;
  name: string;
  base_salary: number;
  cost_of_living_index: number;
  created_at: string;
  updated_at: string;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: 'Paris',
    base_salary: 45000,
    cost_of_living_index: 8.5,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 2, 
    name: 'Lyon',
    base_salary: 38000,
    cost_of_living_index: 7.2,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 3,
    name: 'Marseille',
    base_salary: 36000,
    cost_of_living_index: 6.8,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  }
];

const Locations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des Localisations</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une localisation..."
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
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            title={location.name}
            onEdit={() => {}}
            onDelete={() => {}}
            lastUpdated={location.updated_at}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Salaire de base:</span>
              <span className="font-semibold dark:text-white">{location.base_salary.toLocaleString()} €</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Indice du coût de la vie:</span>
              <span className="font-semibold dark:text-white">{location.cost_of_living_index}/10</span>
            </div>
          </Card>
        ))}
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter une localisation"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de la localisation
            </label>
            <Input
              name="name"
              type="text"
              placeholder="Entrez le nom de la localisation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Salaire de base
            </label>
            <Input
              name="base_salary"
              type="number"
              placeholder="Entrez le salaire de base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Indice du coût de la vie
            </label>
            <Input
              name="cost_of_living_index"
              type="number"
              placeholder="Entrez l'indice du coût de la vie"
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Locations;