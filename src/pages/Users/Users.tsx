import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faEdit,
  faTrash,
  faUserPlus,
  faUserCheck,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { CardDataStats, Input, ModalAdd } from '../../components';
import Select from '../../components/Forms/Select';
import { useForm } from 'react-hook-form';
import apiClient from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  hire_date: string;
  grade: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<User>();

  const currentRole = watch('role');

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await apiClient.get('/users/');
        const fetchedUsers: User[] = response;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error,
        );
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter(
      (user) =>
        (user?.first_name?.toLowerCase() || '').includes(term) ||
        (user?.last_name?.toLowerCase() || '').includes(term) ||
        (user?.email?.toLowerCase() || '').includes(term) ||
        (user?.role?.toLowerCase() || '').includes(term),
    );

    setFilteredUsers(filtered);
  };

  const handleEdit = (userId: number) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId: number) => {
    const userToDelete = users.find((user) => user.id === userId);
    if (userToDelete) {
      setSelectedUser(userToDelete);
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${userToDelete.first_name} ${userToDelete.last_name} ?`,
        )
      ) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
      }
    }
  };

  const handleSaveEdit = (updatedUser: User) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir enregistrer ces modifications ?')
    ) {
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
      setFilteredUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
      setShowEditModal(false);
      setSelectedUser(null);
      reset();
    }
  };

  const onSubmit = async (data: User) => {
    try {
      const formattedData = {
        first_name: data.first_name?.trim() || '',
        last_name: data.last_name?.trim() || '',
        password: data.phone_number || '',
        manager_id: 2,
        email: data.email?.toLowerCase()?.trim() || '',
        phone_number: data.phone_number
          ? parseInt(data.phone_number.toString().replace(/\D/g, ''))
          : 0,
        role: data.role,
        hire_date: data.hire_date
          ? data.hire_date
          : new Date().toISOString().split('T')[0],
        grade: data.role === 'USER' ? data.grade : "aucun",
      };

      // console.log(formattedData);
      // return

      const response = await apiClient.post('/users/', formattedData);

      const newUser = (await response.data) as User;
      setShowAddModal(false);
      reset();
    } catch (error) {
      console.error('Erreur:', error);
      if (error instanceof Error) {
        alert(error.message || "Erreur lors de la création de l'utilisateur");
      } else {
        alert("Une erreur est survenue lors de la création de l'utilisateur");
      }
    }
  };

  const handleEditUser = async (userData: User) => {
    try {
      const updatedUser = { ...userData };
      setUsers((prev) =>
        prev.map((user) => (user.id === userData.id ? updatedUser : user)),
      );
      setFilteredUsers((prev) =>
        prev.map((user) => (user.id === userData.id ? updatedUser : user)),
      );
      setShowEditModal(false);
      setSelectedUser(null);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Utilisateurs"
          total={users.length.toString()}
          rate="12.5%"
          levelUp
        >
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Utilisateurs Actifs"
          total="15"
          rate="8.2%"
          levelUp
        >
          <FontAwesomeIcon icon={faUserCheck} className="text-success" />
        </CardDataStats>
        <CardDataStats
          title="Nouveaux Utilisateurs"
          total="12"
          rate="2.3%"
          levelUp
        >
          <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Utilisateurs Inactifs"
          total="3"
          rate="1.8%"
          levelDown
        >
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
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-3 text-gray-400"
            />
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
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Nom complet
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Téléphone
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Grade
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {user?.first_name || ''} {user?.last_name || ''}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user?.email || ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user?.phone_number || ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user?.grade || ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(user.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="hover:text-danger"
                        onClick={() => handleDelete(user.id)}
                      >
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
        onClose={() => {
          setShowAddModal(false);
          reset();
        }}
        onSave={handleSubmit(onSubmit)}
        title="Ajouter un utilisateur"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prénom
            </label>
            <Input
              name="first_name"
              type="text"
              placeholder="Entrez le prénom"
              error={errors.first_name?.message}
              register={register('first_name', {
                required: 'Le prénom est requis',
              })}
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
              error={errors.last_name?.message}
              register={register('last_name', {
                required: 'Le nom est requis',
              })}
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
              error={errors.email?.message}
              register={register('email', {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide',
                },
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro de téléphone
            </label>
            <Input
              name="phone_number"
              type="tel"
              placeholder="Entrez le numéro de téléphone"
              error={errors.phone_number?.message}
              register={register('phone_number', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Numéro de téléphone invalide',
                },
              })}
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
              error={errors.hire_date?.message}
              register={register('hire_date', {
                required: "La date d'embauche est requise",
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <Select
              name="role"
              options={[
                { value: 'ADMIN', label: 'Administrateur' },
                { value: 'USER', label: 'Utilisateur' },
              ]}
              placeholder="Sélectionnez le rôle"
              error={errors.role?.message}
              register={register('role', { required: 'Le rôle est requis' })}
            />
          </div>
          {currentRole === 'USER' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Grade
              </label>
              <Select
                name="grade"
                options={[
                  { value: 'chargeAffaire', label: "Chargé d'affaires" },
                  { value: 'manager', label: 'Manager' },
                  { value: 'seniorManager', label: 'Sénior Manager' },
                  { value: 'executiveManager', label: 'Exécutive Manager' },
                  { value: 'eliteManager', label: 'Elite Manager' },
                ]}
                placeholder="Sélectionnez le grade"
                error={errors.grade?.message}
                register={register('grade', { required: 'Le grade est requis' })}
              />
            </div>
          )}
        </form>
      </ModalAdd>
    </div>
  );
};

export default Users;
