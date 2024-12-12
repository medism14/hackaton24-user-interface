import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash, faUserPlus, faUserCheck, faUserMinus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CardDataStats, Input, ModalAdd } from '../../components';
import Select from '../../components/Forms/Select';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  carte_cci: string;
  phone_number: string;
  role: string;
  hire_date: string;
  grade: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [userData, setUserData] = useState<User | null>(null);


  // Données factices
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        first_name: 'Sophie',
        last_name: 'Martin',
        email: 'sophie.martin@example.com',
        carte_cci: 'CCI001',
        phone_number: '0612345678',
        role: 'Manager RH',
        hire_date: '2023-01-15',
        grade: 'Manager'
      },
      {
        id: 2,
        first_name: 'Thomas',
        last_name: 'Bernard',
        email: 'thomas.bernard@example.com',
        carte_cci: 'CCI002',
        phone_number: '0623456789',
        role: 'Développeur',
        hire_date: '2023-03-20',
        grade: 'Senior Manager'
      },
      {
        id: 3,
        first_name: 'Marie',
        last_name: 'Dubois',
        email: 'marie.dubois@example.com',
        carte_cci: 'CCI003',
        phone_number: '0634567890',
        role: 'Comptable',
        hire_date: '2022-11-05',
        grade: 'Exécutive Manager'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter(user =>
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
  };


  const handleEdit = (userId: number) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setShowEditModal(true);
    }
  };

  const handleDelete = (userId: number) => {
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete) {
      setSelectedUser(userToDelete);
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${userToDelete.first_name} ${userToDelete.last_name} ?`)) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        setFilteredUsers(prev => prev.filter(user => user.id !== userId));
      }
    }
  };

  const handleSaveEdit = (updatedUser: User) => {
    if (window.confirm('Êtes-vous sûr de vouloir enregistrer ces modifications ?')) {
      setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
      setFilteredUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleAddUser = async (userData: User) => {
    try {
      const response = await fetch('http://172.20.10.209:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
      }

      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      setFilteredUsers(prev => [...prev, newUser]);
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = async (userData: User) => {
    try {
      const response = await fetch(`http://172.20.10.209:8000/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'utilisateur');
      }

      const updatedUser = await response.json();
      setUsers(prev => prev.map(user => user.id === userData.id ? updatedUser : user));
      setFilteredUsers(prev => prev.map(user => user.id === userData.id ? updatedUser : user));
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://172.20.10.209:8000/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

      setUsers(prev => prev.filter(user => user.id !== userId));
      setFilteredUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Utilisateurs" total={users.length.toString()} rate="12.5%" levelUp>
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Utilisateurs Actifs" total="15" rate="8.2%" levelUp>
          <FontAwesomeIcon icon={faUserCheck} className="text-success" />
        </CardDataStats>
        <CardDataStats title="Nouveaux Utilisateurs" total="12" rate="2.3%" levelUp>
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Utilisateurs Inactifs" total="3" rate="1.8%" levelDown>
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
                <th className="py-4 px-4 font-medium text-black dark:text-white">Carte CCI</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Téléphone</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Grade</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.first_name} {user.last_name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.carte_cci}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.phone_number}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.grade}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleEdit(user.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="hover:text-danger" onClick={() => handleDelete(user.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="hover:text-green-500" onClick={() => handleDelete(user.id)}>
                        <FontAwesomeIcon icon={faEllipsis} />
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
        onSave={() => handleAddUser}
        title="Ajouter un utilisateur"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prénom
            </label>
            <Input
              name="first_name"
              type="text"
              placeholder="Entrez le prénom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom
            </label>
            <Input
              name="last_name"
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
              Numéro de carte CCI
            </label>
            <Input
              name="carte_cci"
              type="text"
              placeholder="Entrez le numéro de carte CCI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro de téléphone
            </label>
            <Input
              name="phone_number"
              type="text"
              placeholder="Entrez le numéro de téléphone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date d'embauche
            </label>
            <Input
              name="hire_date"
              type="date"
              placeholder="Sélectionnez la date d'embauche"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade
            </label>
            <Select
              name="grade"
              options={[
                { value: 'manager', label: 'Manager' },
                { value: 'senior_manager', label: 'Sénior Manager' },
                { value: 'executive_manager', label: 'Exécutive Manager' },
                { value: 'elite_manager', label: 'Elite Manager' },
              ]}
              placeholder="Sélectionnez le grade"
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
        </div>
      </ModalAdd>


      {/* <ModalEdit
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveEdit}
        title="Modifier un utilisateur"
        initialData={selectedUser}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prénom
            </label>
            <Input
              name="first_name"
              type="text"
              placeholder="Entrez le prénom"
              value={selectedUser?.first_name || ''}
              onChange={(e) => {
                if (selectedUser) {
                  setSelectedUser({
                    ...selectedUser,
                    first_name: e.target.value
                  });
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom
            </label>
            <Input
              name="last_name"
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
              Numéro de carte CCI
            </label>
            <Input
              name="carte_cci"
              type="text"
              placeholder="Entrez le numéro de carte CCI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro de téléphone
            </label>
            <Input
              name="phone_number"
              type="text"
              placeholder="Entrez le numéro de téléphone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date d'embauche
            </label>
            <Input
              name="hire_date"
              type="date"
              placeholder="Sélectionnez la date d'embauche"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade
            </label>
            <Select
              name="grade"
              options={[
                { value: 'manager', label: 'Manager' },
                { value: 'senior_manager', label: 'Sénior Manager' },
                { value: 'executive_manager', label: 'Exécutive Manager' },
                { value: 'elite_manager', label: 'Elite Manager' },
              ]}
              placeholder="Sélectionnez le grade"
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
        </div>
      </ModalEdit>
       */}

    </div>
  );
};

export default Users;
