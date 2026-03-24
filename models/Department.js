import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Deparment = database.define('department', {
    nom: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.TEXT,
    image: DataTypes.STRING
}, {
    timestamps: false,
})

export default Deparment