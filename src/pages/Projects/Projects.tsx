import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardDataStats, Input, ModalAdd } from '../../components';
import Select from '../../components/Forms/Select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';

interface Project {
  id: number;
  user_id: number;
  project_name: string;
  project_status: 'En cours' | 'Terminé' | 'Abandonné';
  project_type: 'Location' | 'Construction';
  location: string;
  parcelle: string;
  power_kwc: number;
  date_completude: string;
  date_pdb: string;
  amount_due_client: number;
  apporteur_affaire: boolean;
  client_name: string;
  client_number: string;
}

interface ProjectFormData {
  user_id: string;
  project_name: string;
  project_status: string;
  project_type: string;
  location: string;
  parcelle: string;
  power_kwc: number;
  date_completude: string;
  date_pdb: string;
  amount_due_client: number;
  apporteur_affaire: string;
  client_name: string;
  client_number: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await apiClient.get('/users/');
        setUsers(await response);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response: any = await apiClient.get('/projects/');
        setProjects(await response);
        setFilteredProjects(await response);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        setError('Erreur lors de la récupération des projets');
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter(
      (project) =>
        project.project_name.toLowerCase().includes(term) ||
        project.project_status.toLowerCase().includes(term) ||
        project.project_type.toLowerCase().includes(term)
    );

    setFilteredProjects(filtered);
  };

  const handleEdit = (projectId: number) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDelete = async (projectId: number) => {
    try {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        await apiClient.delete(`/projects/${projectId}`);
        setProjects((prev) => prev.filter((project) => project.id !== projectId));
        setFilteredProjects((prev) => prev.filter((project) => project.id !== projectId));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const projectData = {
        ...data,
        user_id: parseInt(data.user_id, 10),
        date_completude: null,
        apporteur_affaire: data.apporteur_affaire
      };

      console.log(projectData);
      // return

      const response = await apiClient.post('/projects/', projectData);
      const newProject: any = response;

      // Récupérer le projet nouvellement créé
      const createdProject = await apiClient.get(`/projects/${newProject.id}`);
      const project: any = createdProject;

      setProjects((prev) => [...prev, project]);
      setFilteredProjects((prev) => [...prev, project]);
      
      reset();
      setShowAddModal(false);
      alert('Projet créé avec succès !');
    } catch (error: any) {
      console.error('Erreur lors de la création du projet:', error);
      setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du projet');
    }
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Projets" total={projects.length.toString()} rate="12.5%" levelUp>
          <FontAwesomeIcon icon={faPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Projets en cours" total={projects.filter(p => p.project_status === 'En cours').length.toString()} rate="8.2%" levelUp>
          <FontAwesomeIcon icon={faPlus} className="text-success" />
        </CardDataStats>
        <CardDataStats title="Projets terminés" total={projects.filter(p => p.project_status === 'Terminé').length.toString()} rate="2.3%" levelUp>
          <FontAwesomeIcon icon={faPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats title="Projets abandonnés" total={projects.filter(p => p.project_status === 'Abandonné').length.toString()} rate="1.8%" levelDown>
          <FontAwesomeIcon icon={faPlus} className="text-danger" />
        </CardDataStats>
      </div>

      <div className="mt-8 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Rechercher un projet..."
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
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un projet
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">Nom du projet</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Statut</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Type</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Localisation</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Puissance (kWc)</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">{project.project_name}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{project.project_status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{project.project_type}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{project.location}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{project.power_kwc}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleEdit(project.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="hover:text-danger" onClick={() => handleDelete(project.id)}>
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
          setError(null);
        }}
        onSave={handleSubmit(onSubmit)}
        title="Ajouter un projet"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chargé d'affaire
            </label>
            <Select
              register={{ ...register('user_id') }}
              name="user_id"
              options={users.map((user) => ({
                value: user.id.toString(),
                label: `${user.first_name} ${user.last_name}`,
              }))}
              placeholder="Sélectionnez un utilisateur"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du projet
            </label>
            <Input
              register={register('project_name')}
              name="project_name"
              type="text"
              placeholder="Entrez le nom du projet"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Statut du projet
            </label>
            <Select
              register={register('project_status')}
              name="project_status"
              options={[
                { value: 'En cours', label: 'En cours' },
                { value: 'Terminé', label: 'Terminé' },
                { value: 'Abandonné', label: 'Abandonné' },
              ]}
              placeholder="Sélectionnez le statut"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de projet
            </label>
            <Select
              register={register('project_type')}
              name="project_type"
              options={[
                { value: 'Location', label: 'Location' },
                { value: 'Construction', label: 'Construction' },
              ]}
              placeholder="Sélectionnez le type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Localisation
            </label>
            <Input
              register={register('location')}
              name="location"
              type="text"
              placeholder="Entrez la localisation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parcelle(m²)
            </label>
            <Input
              register={register('parcelle')}
              name="parcelle"
              type="text"
              placeholder="Entrez la parcelle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Puissance (kWc)
            </label>
            <Input
              register={register('power_kwc', { valueAsNumber: true })}
              name="power_kwc"
              type="number"
              placeholder="Entrez la puissance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date PDB
            </label>
            <Input
              register={register('date_pdb')}
              name="date_pdb"
              type="date"
              placeholder="Sélectionnez la date PDB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Montant dû client
            </label>
            <Input
              register={register('amount_due_client', { valueAsNumber: true })}
              name="amount_due_client"
              type="number"
              placeholder="Entrez le montant"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apporteur d'affaire
            </label>
            <Select
              register={register('apporteur_affaire')}
              name="apporteur_affaire"
              options={[
                { value: 'true', label: 'Oui' },
                { value: 'false', label: 'Non' },
              ]}
              placeholder="Sélectionnez oui ou non"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du client
            </label>
            <Input
              register={register('client_name')}
              name="client_name"
              type="text"
              placeholder="Entrez le nom du client"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro du client
            </label>
            <Input
              register={register('client_number')}
              name="client_number"
              type="text"
              placeholder="Entrez le numéro du client"
            />
          </div>
        </form>
      </ModalAdd>
    </div>
  );
};

export default Projects;
