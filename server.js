//Importer tous les modules installes
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();

import database from './config/db.js';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from './controllers/rolesController.js';

//Creation de l'application express
const app = express();

//Utilisation des middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creation des tables dans la base de données
database.sync({ alter: true })
    .then(() => console.log('La base de données a été synchronisée avec succès.'))
    .catch((error) => console.error('Erreur lors de la synchronisation de la base de données :', error));

//Creation de notre premiere route
app.get('/premiere-route', (req, res) => res.send('Ceci est ma premiere route avec Express'));

//Routes
app.get('/api/roles', getAllRoles);
app.get('/api/roles/:id', getRoleById);
app.post('/api/roles', createRole);
app.put('/api/roles/:id', updateRole);
app.delete('/api/roles/:id', deleteRole);

//Demarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Le serveur a demarre sur le port ${PORT}`));