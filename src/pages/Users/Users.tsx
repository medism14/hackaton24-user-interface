import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash, faUserPlus, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { CardDataStats, Input, ModalAdd } from '../../components';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Données factices
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'Sophie',
        lastName: 'Martin',
        email: 'sophie.martin@example.com',
        role: 'Manager RH',
        department: 'Ressources Humaines',
        status: 'active',
        joinDate: '2023-01-15'
      },
      {
        id: 2,
        firstName: 'Thomas',
        lastName: 'Bernard',
        email: 'thomas.bernard@example.com',
        role: 'Développeur',
        department: 'IT',
        status: 'active',
        joinDate: '2023-03-20'
      },
      {
        id: 3,
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@example.com',
        role: 'Comptable',
        department: 'Finance',
        status: 'inactive',
        joinDate: '2022-11-05'
      },
      // Ajoutez plus d'utilisateurs ici...
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filtered);
  };

  const handleEdit = (userId: number) => {
    // Logique pour éditer un utilisateur
    console.log('Éditer utilisateur:', userId);
  };

  const handleDelete = (userId: number) => {
    // Logique pour supprimer un utilisateur
    console.log('Supprimer utilisateur:', userId);
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Utilisateurs" total={users.length.toString()} rate="12.5%" levelUp>
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Utilisateurs Actifs" total={users.filter(u => u.status === 'active').length.toString()} rate="8.2%" levelUp>
          <FontAwesomeIcon icon={faUserCheck} className="text-success" />
        </CardDataStats>
        <CardDataStats title="Nouveaux Utilisateurs" total="12" rate="2.3%" levelUp>
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Utilisateurs Inactifs" total={users.filter(u => u.status === 'inactive').length.toString()} rate="1.8%" levelDown>
          <FontAwesomeIcon icon={faUserMinus} className="text-danger" />
        </CardDataStats>
      </div>

      <div className="mt-8 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3 text-gray-400" />
          </div>
          <button 
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-white hover:bg-opacity-90"
            onClick={() => setShowAddModal(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Ajouter un utilisateur
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">Nom complet</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Email</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Rôle</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Département</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Statut</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.firstName} {user.lastName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.role}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.department}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                      user.status === 'active' 
                        ? 'bg-success bg-opacity-10 text-success' 
                        : 'bg-danger bg-opacity-10 text-danger'
                    }`}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleEdit(user.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="hover:text-danger" onClick={() => handleDelete(user.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un utilisateur"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prénom
            </label>
            <Input
              name="firstName"
              type="text"
              placeholder="Entrez le prénom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom
            </label>
            <Input
              name="lastName"
              type="text"
              placeholder="Entrez le nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Entrez l'email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <Input
              name="role"
              type="text"
              placeholder="Entrez le rôle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Département
            </label>
            <Input
              name="department"
              type="text"
              placeholder="Entrez le département"
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Users;
