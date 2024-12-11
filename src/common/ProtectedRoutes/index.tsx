import {
  createBrowserRouter,
  redirect,
  LoaderFunction,
} from 'react-router-dom';
import store from '../../redux/store';
import App from '../../App';
import { pages } from '../../utils/allPages';
import PageTitle from '../../components/PageTitle/PageTitle'; // Importation du composant PageTitle

// Loader pour vérifier l'authentification
const authLoader: LoaderFunction = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  if (!isAuthenticated) {
    return redirect('/');
  }

  return null;
};

// Loader pour les routes publiques (comme login)
const publicLoader: LoaderFunction = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  if (isAuthenticated) {
    return redirect('/dashboard');
  }

  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...pages.map((page) => {
        return {
          path: page.path,
          element: (
            <>
              <PageTitle title={page.name} /> {/* Utilisation du composant PageTitle */}
              <page.component />
            </>
          ),
          loader:
            page.loader === 'auth'
              ? authLoader
              : page.loader === 'public'
              ? publicLoader
              : undefined,
          index: page.path === '/',
        };
      }),
    ],
  },
]);
