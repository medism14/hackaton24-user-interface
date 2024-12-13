import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../components';
import Select from '../../components/Forms/Select';
import apiClient from '../../api/axios';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  grade: string;
  role: string;
}

const UsersEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/users/${id}`);
        const userData: any = await response;

        console.log(userData);
        // Formater les données pour correspondre au formulaire
        const formattedData = {
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          phoneNumber: userData.phone_number,
          hireDate: new Date(userData.hire_date).toISOString().split('T')[0],
          grade: userData.grade,
          role: userData.role,
        };

        reset(formattedData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      const formattedData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
        hire_date: data.hireDate,
        grade: data.grade,
        role: data.role,
      };

      await apiClient.put(`/users/${id}`, formattedData);
      navigate('/users');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Modifier l'utilisateur {id}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Retour
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prénom
          </label>
          <Input
            name="firstName"
            type="text"
            placeholder="Entrez le prénom"
            error={errors.firstName?.message}
            register={register('firstName', {
              required: 'Le prénom est requis',
            })}
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
            error={errors.lastName?.message}
            register={register('lastName', { required: 'Le nom est requis' })}
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
            name="phoneNumber"
            type="tel"
            placeholder="Entrez le numéro de téléphone"
            error={errors.phoneNumber?.message}
            register={register('phoneNumber', {
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
            name="hireDate"
            type="date"
            placeholder="Sélectionnez la date d'embauche"
            error={errors.hireDate?.message}
            register={register('hireDate', {
              required: "La date d'embauche est requise",
            })}
          />
        </div>

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

        <div className="col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => reset()}
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersEdit;
