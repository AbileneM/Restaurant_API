import { Menu, Categorie } from "../models/relation.js";

// Récupérer tous les plats du menu avec leurs catégories associées
export const getAllMenu = async (req, res) => {
    try {
        const menus = await Menu.findAll({
            include: [
                {
                    model: Categorie,
                    attributes: ["id_categorie", "nom", "description"]
                }
            ]
        });

        res.status(200).json({ data: menus });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

// Récupérer un plat du menu par son ID avec sa catégorie associée
export const getMenuById = async (req, res) => {
    const { id } = req.params;

    try {
        const menu = await Menu.findByPk(id, {
            include: [
                {
                    model: Categorie,
                    attributes: ["id_categorie", "nom", "description"]
                }
            ]
        });

        if (!menu) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }
        res.status(200).json({ data: menu });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Créer un nouveau plat dans le menu
export const createMenu = async (req, res) => {
    const { nom, description, prix, disponibilite, image_plat, id_categorie } = req.body;

    try {
        const newMenu = await Menu.create({
            nom,
            description,
            prix,
            disponibilite,
            image_plat,
            id_categorie
        });

        res.status(201).json({ data: newMenu });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un plat du menu
export const updateMenu = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await Menu.update(req.body, {
            where: { id_menu: id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }

        res.status(200).json({ message: "Plat mis à jour" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un plat du menu
export const deleteMenu = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Menu.destroy({
            where: { id_menu: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }

        res.status(200).json({ message: "Plat supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};