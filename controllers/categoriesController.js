import {from '../models/Categorie.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Catogorie.findAll();
        res.status(200).json({data: categories});
    } catch (error) {
        res.status(404).json({error: 'Une erreur est survenue lors de la récupération des catégories.'});
    }
};

export const getCategorieById = async (req, res) => {
    const { id } = req.params 
    try {
        const categorie = await Catogorie.findByPk(id);
        if (!categorie) {
            return res.status(404).json({message: 'La catégorie n\'a pas été trouvée.'});
        }
        res.status(200).json({data: categorie});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
