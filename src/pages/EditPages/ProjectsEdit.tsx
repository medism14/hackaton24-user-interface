import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components';
import Select from '../../components/Forms/Select';
import Checkbox from '../../components/Forms/Checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../api/axios';

interface ProjectFormData {
  user_id: string;
  project_name: string;
  project_status: string;
  project_type: string;
  client_name: string;
  client_number: string;
  amount_due_client: number;
  location: string;
  parcelle: string;
  power_kwc: number;
  date_pdb: string;
  date_completure: string;
  apporteur_affaire: boolean;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const ProjectsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProjectFormData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Récupération des utilisateurs
        const usersResponse = await apiClient.get('/users/');
        if (!usersResponse || !Array.isArray(usersResponse)) {
          throw new Error('Format de réponse utilisateurs invalide');
        }
        setUsers(usersResponse);

        // Récupération du projet spécifique
        const projectResponse = await apiClient.get(`/projects/${id}`);

        return;

        if (!projectResponse) {
          throw new Error('Projet non trouvé');
        }
        const projectData: any = projectResponse;

        // Vérification et formatage des données avant de les définir
        setValue('user_id', projectData.user_id?.toString() || '');
        setValue('project_name', projectData.project_name || '');
        setValue('project_status', projectData.project_status || '');
        setValue('project_type', projectData.project_type || '');
        setValue('client_name', projectData.client_name || '');
        setValue('client_number', projectData.client_number || '');
        setValue('amount_due_client', projectData.amount_due_client || 0);
        setValue('location', projectData.location || '');
        setValue('parcelle', projectData.parcelle || '');
        setValue('power_kwc', projectData.power_kwc || 0);
        setValue('date_pdb', projectData.date_pdb ? projectData.date_pdb.split('T')[0] : '');
        setValue('date_completure', projectData.date_completure ? projectData.date_completure.split('T')[0] : '');
        setValue('apporteur_affaire', Boolean(projectData.apporteur_affaire));

      } catch (error) {
        console.error('Erreur détaillée:', error);
        setError(error instanceof Error ? error.message : 'Erreur lors de la récupération des données');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const formattedData = {
        user_id: parseInt(data.user_id),
        project_name: data.project_name?.trim() || '',
        project_status: data.project_status,
        project_type: data.project_type,
        client_name: data.client_name?.trim() || '',
        client_number: data.client_number?.trim() || '',
        amount_due_client: data.amount_due_client || 0,
        location: data.location?.trim() || '',
        parcelle: data.parcelle?.trim() || '',
        power_kwc: data.power_kwc || 0,
        date_pdb: data.date_pdb || null,
        date_completure: data.date_completure || null,
        apporteur_affaire: data.apporteur_affaire || false
      };

      await apiClient.put(`/projects/${id}`, formattedData);
      alert('Projet modifié avec succès');
      navigate('/projects');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (error instanceof Error) {
        alert(error.message || "Erreur lors de la modification du projet");
      } else {
        alert("Une erreur est survenue lors de la modification du projet");
      }
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erreur: {error}
        <button 
          onClick={() => navigate('/projects')}
          className="ml-4 px-4 py-2 bg-primary text-white rounded"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Modifier le projet {id}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date de signature de la promesse de bail
          </label>
          <Input
            name="date_pdb"
            type="date"
            placeholder="Sélectionnez la date PDB"
            error={errors.date_pdb?.message}
            register={register('date_pdb')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom du chargé d'affaire sur le projet
          </label>
          <Select
            name="user_id"
            options={users.map(user => ({
              value: user.id.toString(),
              label: `${user.first_name} ${user.last_name}`
            }))}
            placeholder="Sélectionnez un utilisateur"
            error={errors.user_id?.message}
            register={register('user_id')}
          />
        </div>

        <div>
          <Checkbox
            name="apporteur_affaire"
            id="apporteur_affaire"
            label="A t'il apporté l'affaire ?"
            register={register('apporteur_affaire')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom du projet
          </label>
          <Input
            name="project_name"
            type="text"
            placeholder="Entrez le nom du projet"
            error={errors.project_name?.message}
            register={register('project_name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Statut du projet
          </label>
          <Select
            name="project_status"
            options={[
              { value: 'En cours', label: 'En cours' },
              { value: 'Terminé', label: 'Terminé' },
              { value: 'Abandonné', label: 'Abandonné' },
            ]}
            placeholder="Sélectionnez le statut"
            error={errors.project_status?.message}
            register={register('project_status')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type de projet
          </label>
          <Select
            name="project_type"
            options={[
              { value: 'Location', label: 'Location' },
              { value: 'Construction', label: 'Construction' },
            ]}
            placeholder="Sélectionnez le type"
            error={errors.project_type?.message}
            register={register('project_type')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom du client
          </label>
          <Input
            name="client_name"
            type="text"
            placeholder="Entrez le nom du client"
            error={errors.client_name?.message}
            register={register('client_name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Numéro du client
          </label>
          <Input
            name="client_number"
            type="text"
            placeholder="Entrez le numéro du client"
            error={errors.client_number?.message}
            register={register('client_number')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Montant dû client
          </label>
          <Input
            name="amount_due_client"
            type="number"
            placeholder="Entrez le montant"
            error={errors.amount_due_client?.message}
            register={register('amount_due_client', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Localisation
          </label>
          <Input
            name="location"
            type="text"
            placeholder="Entrez la localisation"
            error={errors.location?.message}
            register={register('location')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Parcelle
          </label>
          <Input
            name="parcelle"
            type="text"
            placeholder="Entrez la parcelle"
            error={errors.parcelle?.message}
            register={register('parcelle')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Puissance (kWc)
          </label>
          <Input
            name="power_kwc"
            type="number"
            placeholder="Entrez la puissance"
            error={errors.power_kwc?.message}
            register={register('power_kwc', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date de fin
          </label>
          <Input
            name="date_completure"
            type="date"
            placeholder="Sélectionnez la date de fin"
            error={errors.date_completure?.message}
            register={register('date_completure')}
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

export default ProjectsEdit;