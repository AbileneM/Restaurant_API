import Categorie from '../models/Categorie.js';
//import { Categorie } from '../models/relation.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json({data: categories});
    } catch (error) {
        res.status(404).json({error: 'Une erreur est survenue lors de la récupération des catégories.'});
    }
};

export const getCategorieById = async (req, res) => {
    const { id } = req.params 
    try {
        const categorie = await Categorie.findByPk(id);
        if (!categorie) {
            return res.status(404).json({message: 'La catégorie n\'a pas été trouvée.'});
        }
        res.status(200).json({data: categorie});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Créer une catégorie
export const createCategorie = async (req, res) => {
    const { nom, description } = req.body;
    try {
        const newCategorie = await Categorie.create({ nom, description });
        res.status(201).json({data: newCategorie});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//Mettre à jour une catégorie
export const updateCategorie = async (req, res) => {
    const { id } = req.params;
    const updateCategorie = { nom: req.body.nom, description: req.body.description };

    if (!id) return res.status(400).json({ message: 'id is required' })
    try {
        const result = await Categorie.update(updateCategorie, { where: { id_categorie: id } });
        res.status(200).json({data: result});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

//Supprimer une catégorie
export const deleteCategorie = async (req, res) => {
    const { id } = req.params;
    try {
        await Categorie.destroy({where: { id_categorie: id }});
        res.status(200).json({message: 'La catégorie a été supprimée avec succès.'});
        }
         catch (error) {
        res.status(400).json({message: error.message});
    }
};

console.log(Categorie);