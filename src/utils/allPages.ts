import { Login, Dashboard, Users, Locations, Roles, Contracts, Bonuses } from '../pages';
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
    path: '*',
    name: 'Non trouvé',
    component: NotFound,
  },
];
