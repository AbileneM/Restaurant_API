import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Modèle de la table roles
const Role = sequelize.define("roles", {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

export default Role;