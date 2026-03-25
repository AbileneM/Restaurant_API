import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Clients from '../models/Clients.js';
import Reviews from '../models/Reviews.js';

export const getAllClients = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (req.query.nom) {
      where.nom = { [Op.like]: `%${req.query.nom}%` };
    }

    if (req.query.prenom) {
      where.prenom = { [Op.like]: `%${req.query.prenom}%` };
    }

    if (req.query.email) {
      where.email = { [Op.like]: `%${req.query.email}%` };
    }

    const { count, rows } = await Clients.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id_client', 'ASC']],
    });

    return res.status(200).json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la recuperation des clients',
      error: error.message,
    });
  }
};

export const getClientById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Clients.findByPk(req.params.id, {
      include: [
        {
          model: Reviews,
          as: 'reviews',
        },
      ],
    });

    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la recuperation du client',
      error: error.message,
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Clients.create(req.body);

    return res.status(201).json({
      message: 'Client cree avec succes',
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la creation du client',
      error: error.message,
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Clients.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    await client.update(req.body);

    return res.status(200).json({
      message: 'Client modifie avec succes',
      data: client,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la modification du client',
      error: error.message,
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Clients.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    await client.destroy();

    return res.status(200).json({
      message: 'Client supprime avec succes',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la suppression du client',
      error: error.message,
    });
  }
};