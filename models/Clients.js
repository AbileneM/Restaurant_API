import { DataTypes } from 'sequelize';
import database from './config/connection.js'

const Clients = database.define(
  'Clients',
  {
    id_client: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'clients',
    timestamps: false,
  }
);

export default Clients;