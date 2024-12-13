import axios from 'axios';

// Créer une instance Axios avec la base URL et les headers
const apiClient = axios.create({
  baseURL: 'http://172.20.10.209:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Exemple : config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error), // Renvoie l'erreur si la requête échoue
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response: any) => response.data, // Renvoie uniquement les données de la réponse
  (error: any) => Promise.reject(error), // Renvoie l'erreur si la réponse échoue
);

export default apiClient;
