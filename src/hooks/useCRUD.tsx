// src/hooks/useCRUD.ts
import { useState, useEffect } from 'react';

const useCRUD = <T extends { id: number }>(apiUrl: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl]);

    const create = async (newItem: T) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'élément');
            }
            const createdItem = await response.json();
            setData(prevData => [...prevData, createdItem]);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const update = async (updatedItem: T) => {
        try {
            const response = await fetch(`${apiUrl}/${updatedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'élément');
            }
            setData(prevData =>
                prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
            );
        } catch (err: any) {
            setError(err.message);
        }
    };

    const remove = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'élément');
            }
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const read = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de l\'élément');
            }
            const item = await response.json();
            return item; // Retourne l'utilisateur trouvé
        } catch (err: any) {
            setError(err.message);
            return null; // Retourne null en cas d'erreur
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, create, update, remove, read }; // Retourner la méthode read
};

export default useCRUD;