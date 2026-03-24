import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Role from "./roles.js";

const User = sequelize.define("users", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id_role"
    }
  }
}, {
  timestamps: false
});

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export default User;