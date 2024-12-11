import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, ModalAdd, Card } from '../../components';

interface Role {
  id: number;
  name: string;
  salary_coefficient: number;
  created_at: string;
  updated_at: string;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Employé',
    salary_coefficient: 1.0,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  },
  {
    id: 2,
    name: 'Manager',
    salary_coefficient: 1.3,
    created_at: '2023-01-15', 
    updated_at: '2023-01-15'
  },
  {
    id: 3,
    name: 'Directeur',
    salary_coefficient: 1.6,
    created_at: '2023-01-15',
    updated_at: '2023-01-15'
  }
];

const Roles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des Rôles</h1>

        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un rôle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark focus:outline-none focus:border-primary dark:focus:border-primary"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
        {filteredRoles.map((role) => (
          <Card
            key={role.id}
            title={role.name}
            onEdit={() => {}}
            onDelete={() => {}}
            lastUpdated={role.updated_at}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Coefficient salarial:</span>
              <span className="font-semibold dark:text-white">+{((role.salary_coefficient - 1) * 100).toFixed(0)}%</span>
            </div>
          </Card>
        ))}
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un rôle"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du rôle
            </label>
            <Input
              name="name"
              type="text"
              placeholder="Entrez le nom du rôle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coefficient salarial
            </label>
            <Input
              name="salary_coefficient"
              type="number"
              placeholder="Entrez le coefficient salarial"
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Roles;