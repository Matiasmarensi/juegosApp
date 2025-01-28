import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./User"; // Importamos User para la relación
import Game from "./Game"; // Importamos Game para la relación

class UserGame extends Model {
  public userId!: number;
  public gameId!: number;
  public favoriteRating!: number;
  public completed!: boolean;
}

UserGame.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
