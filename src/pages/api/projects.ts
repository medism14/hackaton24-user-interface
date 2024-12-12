// Définir les types pour la requête et la réponse
interface CustomRequest {
    method: string;
    body: any;
}

interface CustomResponse {
    status: (code: number) => {
        json: (data: any) => void;
    };
}

import fs from 'fs';
import path from 'path';

export default async function handler(req: CustomRequest, res: CustomResponse) {
    if (req.method === 'POST') {
        try {
            const filePath = path.join(process.cwd(), 'src/data/projects.json');

            // Lire le fichier existant
            let projects = [];
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                projects = JSON.parse(fileContent);
            }

            // Ajouter le nouveau projet
            const newProject = { ...req.body, id: Date.now() };
            projects.push(newProject);

            // Écrire dans le fichier
            fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

            res.status(200).json({ message: 'Projet sauvegardé avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la sauvegarde du projet' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}