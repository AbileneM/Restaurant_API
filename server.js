//Importer tous les modules installes
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv'
dotenv.config()
import database from './config/connection.js'

// Models
import './models/Clients.js';
import './models/Reviews.js';

// Controllers clients
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from './controllers/clientsController.js';

// Controllers reviews
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from './controllers/reviewsController.js';


//Creation de l'application express
const app = express()

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

//Route de test

app.get('/', (req, res) => {
  res.json({ message: 'API Restaurant en marche' });
});

// ROUTES CLIENTS
app.get('/api/clients', listClientsValidation, getAllClients);
app.get('/api/clients/:id', clientIdValidation, getClientById);
app.post('/api/clients', createClientValidation, createClient);
app.put('/api/clients/:id', updateClientValidation, updateClient);
app.delete('/api/clients/:id', clientIdValidation, deleteClient);



// ROUTES REVIEWS
app.get('/api/reviews', listReviewsValidation, getAllReviews);
app.get('/api/reviews/:id', reviewIdValidation, getReviewById);
app.post('/api/reviews', createReviewValidation, createReview);
app.put('/api/reviews/:id', updateReviewValidation, updateReview);
app.delete('/api/reviews/:id', reviewIdValidation, deleteReview);


// Sync DB
database
  .sync({ alter: true })
  .then(() => {
    console.log('La base de donnees a ete synchronisee avec succes');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de donnees :', error);
  });








//Demarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Le serveur a demarre sur le port ${PORT}`));