import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import UserGame from "./UserGame"; // Importamos UserGame para definir la relación

class Game extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public released!: Date;
  public rating!: number;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
  }
);

// Asociaciones
Game.hasMany(UserGame, { foreignKey: "gameId" });
UserGame.belongsTo(Game, { foreignKey: "gameId" });

export default Game;
