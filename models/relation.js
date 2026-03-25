import connection from "../config/db.js";
import Categorie from "./Categorie.js";
import Menu from "./Menu.js";

// Relationsentre les modèles
Categorie.hasMany(Menu)

Menu.belongsTo(Categorie, {foreignKey: "id_categorie"});

export { connection, Categorie, Menu };