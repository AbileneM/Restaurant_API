import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Définition du modèle roles
// Cette table sert à stocker les rôles des utilisateurs
const Role = sequelize.define("roles", {
  // Clé primaire de la table roles
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // Nom du rôle : admin ou employe
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Désactive les colonnes createdAt et updatedAt
  timestamps: false
});

export default Role;