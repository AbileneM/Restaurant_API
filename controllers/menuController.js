import Menu from "../models/Menu.js";
import Category from "../models/Categories.js";

// Récupérer tous les menus avec leur catégorie
export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: Category
    });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un menu par son id
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: Category
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu introuvable" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouveau menu
export const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create({
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      image_plat: req.body.image_plat,
      id_categorie: req.body.id_categorie
    });

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un menu par son id
export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu introuvable" });
    }

    await menu.update({
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      image_plat: req.body.image_plat,
      id_categorie: req.body.id_categorie
    });

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un menu par son id
export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu introuvable" });
    }

    await menu.destroy();
    res.status(200).json({ message: "Menu supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};