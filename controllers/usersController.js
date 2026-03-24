import User from "../models/User.js";
import Role from "../models/roles.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Role
    });

    if (!user) {
      return res.status(404).json({ message: "User introuvable" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User introuvable" });
    }

    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User introuvable" });
    }

    await user.destroy();
    res.status(200).json({ message: "User supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};