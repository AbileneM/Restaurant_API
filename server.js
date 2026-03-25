//Importer tous les modules installes
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv'
dotenv.config()
import connection from './config/db.js';
import { getAllCategories, getCategorieById, updateCategorie, deleteCategorie, createCategorie } from './controllers/categoriesController.js';
import { getAllMenu, getMenuById, createMenu, updateMenu, deleteMenu } from './controllers/menuController.js';
//Creation de l'application express
const app = express()

//Utilisation des middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creation des tables dans la base de données
connection.sync({ alter: true })
    .then(() => console.log('La base de données a été synchronisée avec succès.'))
    .catch((error) => console.error('Erreur lors de la synchronisation de la base de données :', error));

//Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du restaurant !');
});

//Routes pour les catégories
app.get('/api/categories', getAllCategories);
app.get('/api/categories/:id', getCategorieById);
app.post('/api/categories', createCategorie);
app.put('/api/categories/:id', updateCategorie);
app.delete('/api/categories/:id', deleteCategorie);

//Routes pour les menus
app.get('/api/menu', getAllMenu);
app.get('/api/menu/:id', getMenuById);
app.post('/api/menu', createMenu);
app.put('/api/menu/:id', updateMenu);
app.delete('/api/menu/:id', deleteMenu);

//Demarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Le serveur a demarre sur le port ${PORT}`));