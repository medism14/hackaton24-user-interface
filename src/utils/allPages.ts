import { Login, Dashboard, Users, Locations, Roles, Contracts, Bonuses, Payments, ProjectsEdit, UsersEdit, PaymentsEdit } from '../pages';
import NotFound from '../common/NotFound';
import Projects from '../pages/Projects/Projects';

export const pages = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    loader: "public",
  },
  {
    path: '/dashboard',
    name: 'Tableau de bord',
    component: Dashboard,
    loader: "auth",
  },
  {
    path: '/users',
    name: 'Utilisateurs',
    component: Users,
    loader: "auth",
  },
  {
    path: '/users/edit/:id',
    name: 'Modifier Utilisateur',
    component: UsersEdit,
    loader: "auth",
  },
  {
    path: '/locations',
    name: 'Emplacements',
    component: Locations,
    loader: "auth",
  },
  {
    path: '/projects',
    name: 'Projets',
    component: Projects,
    loader: "auth",
  },
  {
    path: '/projects/edit/:id',
    name: 'Modifier Projet',
    component: ProjectsEdit,
    loader: "auth",
  },
  {
    path: '/roles',
    name: 'Rôles',
    component: Roles,
    loader: "auth",
  },
  {
    path: '/contracts',
    name: 'Contrats',
    component: Contracts,
    loader: "auth",
  },
  {
    path: '/bonuses',
    name: 'Bonus',
    component: Bonuses,
    loader: "auth",
  },
  {
    path: '/payments',
    name: 'Paiements',
    component: Payments,
    loader: "auth",
  },
  {
    path: '/payments/edit/:id',
    name: 'Modifier Paiement',
    component: PaymentsEdit,
    loader: "auth",
  },
  {
    path: '*',
    name: 'Non trouvé',
    component: NotFound,
  },
];
