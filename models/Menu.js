import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Menu = connection.define("menu", {
    id_menu: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nom: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    prix: {type: DataTypes.DECIMAL(10,2), allowNull: false
    },
    image_plat: {type: DataTypes.STRING},
    id_categorie: {type: DataTypes.INTEGER}
}, {
    tableName: "menu",
    timestamps: false
})

export default Menu;