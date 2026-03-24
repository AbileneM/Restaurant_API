//Importer tous les modules installes
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv'
dotenv.config()
import database from './config/connection.js'
import usersRoutes from './routes/usersRoutes.js';

//Creation de l'application express
const app = express()

//Utilisation des middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creation des tables dans la base de données
database.sync({ alter: true })
    .then(() => console.log('La base de données a été synchronisée avec succès.'))
    .catch((error) => console.error('Erreur lors de la synchronisation de la base de données :', error));
//Creation de notre premiere route

app.get('/premiere-route',(req, res)=>res.send('Ceci est ma premiere route avec Express'));
app.get('/api/users',getAllUsers)

//Route pour les etudiants
app.get('/api/users',getAllUsers)
//Demarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Le serveur a demarre sur le port ${PORT}`));