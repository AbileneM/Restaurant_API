import { validationResult } from 'express-validator';
import Reviews from '../models/Reviews.js';
import Clients from '../models/Clients.js';

export const getAllReviews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (req.query.note) {
      where.note = req.query.note;
    }

    if (req.query.id_client) {
      where.id_client = req.query.id_client;
    }

    const { count, rows } = await Reviews.findAndCountAll({
      where,
      include: [
        {
          model: Clients,
          as: 'client',
          attributes: ['id_client', 'nom', 'prenom', 'email'],
        },
      ],
      limit,
      offset,
      order: [['id_review', 'ASC']],
    });

    return res.status(200).json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la recuperation des reviews',
      error: error.message,
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Reviews.findByPk(req.params.id, {
      include: [
        {
          model: Clients,
          as: 'client',
          attributes: ['id_client', 'nom', 'prenom', 'email'],
        },
      ],
    });

    if (!review) {
      return res.status(404).json({ message: 'Review introuvable' });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la recuperation de la review',
      error: error.message,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Clients.findByPk(req.body.id_client);

    if (!client) {
      return res.status(404).json({ message: 'Client associe introuvable' });
    }

    const review = await Reviews.create(req.body);

    return res.status(201).json({
      message: 'Review creee avec succes',
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la creation de la review',
      error: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Reviews.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review introuvable' });
    }

    if (req.body.id_client) {
      const client = await Clients.findByPk(req.body.id_client);
      if (!client) {
        return res.status(404).json({ message: 'Client associe introuvable' });
      }
    }

    await review.update(req.body);

    return res.status(200).json({
      message: 'Review modifiee avec succes',
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la modification de la review',
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Reviews.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review introuvable' });
    }

    await review.destroy();

    return res.status(200).json({
      message: 'Review supprimee avec succes',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la suppression de la review',
      error: error.message,
    });
  }
};