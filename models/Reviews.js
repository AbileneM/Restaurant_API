import { DataTypes } from 'sequelize';
import database from '../config/db.js';
import Clients from './Clients.js';

const Reviews = database.define(
  'Reviews',
  {
    id_review: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_review: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id_client',
      },
    },
  },
  {
    tableName: 'reviews',
    timestamps: false,
  }
);

Clients.hasMany(Reviews, {
  foreignKey: 'id_client',
  as: 'reviews',
  onDelete: 'CASCADE',
});

Reviews.belongsTo(Clients, {
  foreignKey: 'id_client',
  as: 'client',
});

export default Reviews;