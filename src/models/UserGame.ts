import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./User"; // Importamos User para la relación
import Game from "./Game"; // Importamos Game para la relación

class UserGame extends Model {
  static find(arg0: { userId: any }) {
    throw new Error("Method not implemented.");
  }
  public userId!: string;
  public gameId!: number;
  public favoriteRating!: number;
  public completed!: boolean;
  public favorite!: boolean;
  public gameDetails!: any;
}

UserGame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    favoriteRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    gameDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserGame",
    tableName: "user_games",
  }
);

export default UserGame;
