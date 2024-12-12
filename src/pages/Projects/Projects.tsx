import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input, ModalAdd, Card } from '../../components';
import Select from '../../components/Forms/Select';
import { Checkbox } from '../../components/Forms/Checkbox';


interface Project {
  id: number;
  user_id: number;
  date_pdb: string;
  apporteur_affaire: boolean;
  project_name: string;
  project_type: 'Location' | 'Construction';
  project_status: 'En cours' | 'Terminé' | 'Abandonné';
  client_name: string;
  client_number: string;
  amount_due_client: number;
  location: string;
  parcelle: string;
  power_kwc: number;
  date_completure: string;
}


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

const mockProjects: Project[] = [
  {
    id: 1,
    user_id: 101,
    project_name: 'Projet A',
    project_status: 'En cours',
    project_type: 'Location',
    location: 'Paris',
    parcelle: 'Parcelle 1',
    power_kwc: 100,
    date_completure: '2023-06-01',
    date_pdb: '2023-05-01',
    amount_due_client: 5000,
    apporteur_affaire: true,
    client_name: 'Client A',
    client_number: '1234567890'
  },
  {
    id: 2,
    user_id: 102,
    project_name: 'Projet B',
    project_status: 'Terminé',
    project_type: 'Construction',
    location: 'Lyon',
    parcelle: 'Parcelle 2',
    power_kwc: 150,
    date_completure: '2023-07-01',
    date_pdb: '2023-06-01',
    amount_due_client: 7500,
    apporteur_affaire: false,
    client_name: 'Client B',
    client_number: '0987654321'
  },
  {
    id: 3,
    user_id: 101,
    project_name: 'Projet A',
    project_status: 'En cours',
    project_type: 'Location',
    location: 'Paris',
    parcelle: 'Parcelle 1',
    power_kwc: 100,
    date_completure: '2023-06-01',
    date_pdb: '2023-05-01',
    amount_due_client: 5000,
    apporteur_affaire: true,
    client_name: 'Client A',
    client_number: '1234567890'
  },
  {
    id: 4,
    user_id: 102,
    project_name: 'Projet B',
    project_status: 'Terminé',
    project_type: 'Construction',
    location: 'Lyon',
    parcelle: 'Parcelle 2',
    power_kwc: 150,
    date_completure: '2023-07-01',
    date_pdb: '2023-06-01',
    amount_due_client: 7500,
    apporteur_affaire: false,
    client_name: 'Client B',
    client_number: '0987654321'
  }
];

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [apporteurAffaire, setApporteurAffaire] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState<ProjectFormData>({
    user_id: '',
    project_name: '',
    project_status: '',
    project_type: '',
    client_name: '',
    client_number: '',
    amount_due_client: 0,
    location: '',
    parcelle: '',
    power_kwc: 0,
    date_pdb: '',
    date_completure: '',
    apporteur_affaire: false
  });

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowAddModal(false);
        // Rafraîchir la liste des projets
        const newProject: Project = {
          ...formData,
          id: Date.now(),
          user_id: parseInt(formData.user_id),
          project_status: formData.project_status as 'En cours' | 'Terminé' | 'Abandonné',
          project_type: formData.project_type as 'Location' | 'Construction'
        };

        setProjects([...projects, newProject]);

        // Réinitialiser le formulaire
        setFormData({
          user_id: '',
          project_name: '',
          project_status: '',
          project_type: '',
          client_name: '',
          client_number: '',
          amount_due_client: 0,
          location: '',
          parcelle: '',
          power_kwc: 0,
          date_pdb: '',
          date_completure: '',
          apporteur_affaire: false
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion des Projets</h1>

        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un projet..."
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
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            title={project.project_name}
            onEdit={() => { }}
            onDelete={() => { }}
            lastUpdated={project.date_completure}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Statut:</span>
              <span className="font-semibold dark:text-white">{project.project_status}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Type:</span>
              <span className="font-semibold dark:text-white">{project.project_type}</span>
            </div>
          </Card>
        ))}
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un projet"
        onSave={() => handleSave}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date de signature de la promesse de bail
            </label>
            <Input
              name="date_pdb"
              type="date"
              placeholder="Sélectionnez la date PDB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du chargé d'affaire sur le projet
            </label>
            <Select
              name="user_id"
              options={[
                { value: '101', label: 'Arnauld' },
                { value: '102', label: 'Mathieu' },
                { value: '103', label: 'Thomas' },
              ]}
              placeholder="Sélectionnez un utilisateur"
            />
          </div>
          <div>
            <Checkbox
              id="apporteur_affaire"
              label="A t'il apporté l'affaire ?"
              marginTop='mt-10'
              checked={apporteurAffaire}
              onChange={setApporteurAffaire}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Statut du projet
            </label>
            <Select
              name="project_status"
              options={[
                { value: 'en_cours', label: 'En cours' },
                { value: 'termine', label: 'Terminé' },
                { value: 'abandonne', label: 'Abandonné' },
              ]}
              placeholder="Sélectionnez le statut"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de projet
            </label>
            <Select
              name="project_type"
              options={[
                { value: 'location', label: 'Location' },
                { value: 'construction', label: 'Construction' },
              ]}
              placeholder="Sélectionnez le type"
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
            />
          </div>
        </div>
      </ModalAdd>
    </div>
  );
};

export default Projects;
