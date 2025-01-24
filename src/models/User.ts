import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import UserGame from "./UserGame"; // Importamos UserGame para definir la relación

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

// Asociaciones
User.hasMany(UserGame, { foreignKey: "userId" });
UserGame.belongsTo(User, { foreignKey: "userId" });

export default User;
