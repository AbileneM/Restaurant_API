import { body, query, param, check } from "express-validator";
const userValidator = [
    body('nom').notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 5 }).withMessage('Le nom doit comporter au moins 5 caractères')
        .isAlpha().withMessage('Le nom doit contenir uniquement des lettres'),
    body('prenom').notEmpty().withMessage('Le prénom est requis')
        .isLength({ min: 5 }).withMessage('Le prénom doit comporter au moins 5 caractères')
        .isAlpha().withMessage('Le prénom doit contenir uniquement des lettres'),
    body('email').isEmail().withMessage('L\'email doit être valide'),
    body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre')
        .matches(/[@$!%*?&]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),   
    body('naissance').isDate().withMessage('La date de naissance doit être une date valide')
        .custom((value) => {
            const today = new Date();   
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();  
            if (age < 0 || age > 150) {
                throw new Error('L\'âge doit être compris entre 0 et 150 ans');
            }
            return true;
        }),
    body('biographie').optional().isLength({ max: 500 }).withMessage('La biographie ne doit pas dépasser 500 caractères'),
    body('photo').optional().isURL().withMessage('La photo doit être une URL valide'),
    body('assiduite').optional().isBoolean().withMessage('L\'assiduité doit être un booléen'),
    body('departmentId').optional().isInt().withMessage('Le departmentId doit être un entier'),
    param('id').optional().isInt().withMessage('L\'ID doit être un entier')
];




const listClientsValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('La page doit être un entier positif'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('La limite doit être entre 1 et 100'),
    query('nom').optional().isString().withMessage('Le nom doit être une chaîne de caractères'),
    query('prenom').optional().isString().withMessage('Le prénom doit être une chaîne de caractères'),
    query('email').optional().isEmail().withMessage('L\'email doit être valide')
];

const clientIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('L\'ID du client doit être un entier positif')
];

const createClientValidation = [
    body('nom').notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2, max: 20 }).withMessage('Le nom doit contenir entre 2 et 20 caractères'),
    body('prenom').notEmpty().withMessage('Le prénom est requis')
        .isLength({ min: 2, max: 20 }).withMessage('Le prénom doit contenir entre 2 et 20 caractères'),
    body('telephone').optional()
        .isLength({ max: 30 }).withMessage('Le téléphone ne doit pas dépasser 30 caractères'),
    body('email').optional()
        .isEmail().withMessage('L\'email doit être valide')
];

const updateClientValidation = [
    param('id').isInt({ min: 1 }).withMessage('L\'ID du client doit être un entier positif'),
    body('nom').optional()
        .isLength({ min: 2, max: 20 }).withMessage('Le nom doit contenir entre 2 et 20 caractères'),
    body('prenom').optional()
        .isLength({ min: 2, max: 20 }).withMessage('Le prénom doit contenir entre 2 et 20 caractères'),
    body('telephone').optional()
        .isLength({ max: 30 }).withMessage('Le téléphone ne doit pas dépasser 30 caractères'),
    body('email').optional()
        .isEmail().withMessage('L\'email doit être valide')
];

const listReviewsValidation = [
    query('page').optional().isInt({ min: 1 }).withMessage('La page doit être un entier positif'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('La limite doit être entre 1 et 100'),
    query('note').optional().isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    query('id_client').optional().isInt({ min: 1 }).withMessage('L\'id_client doit être un entier positif')
];

const reviewIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('L\'ID de la review doit être un entier positif')
];

const createReviewValidation = [
    body('note').notEmpty().withMessage('La note est requise')
        .isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    body('commentaire').optional()
        .isString().withMessage('Le commentaire doit être un texte'),
    body('id_client').notEmpty().withMessage('L\'id_client est requis')
        .isInt({ min: 1 }).withMessage('L\'id_client doit être un entier positif')
];

const updateReviewValidation = [
    param('id').isInt({ min: 1 }).withMessage('L\'ID de la review doit être un entier positif'),
    body('note').optional()
        .isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    body('commentaire').optional()
        .isString().withMessage('Le commentaire doit être un texte'),
    body('id_client').optional()
        .isInt({ min: 1 }).withMessage('L\'id_client doit être un entier positif')
];



export default {
    userValidator,
    listClientsValidation,
    clientIdValidation,
    createClientValidation,
    updateClientValidation,
    listReviewsValidation,
    reviewIdValidation,
    createReviewValidation,
    updateReviewValidation
};










