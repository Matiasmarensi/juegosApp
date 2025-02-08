import UserGame from "../../models/UserGame";

export const getGamebyId = async (id: string) => {
  try {
    const game = await UserGame.findByPk(id, {
      attributes: ["id", "userId", "gameId", "completed", "favorite", "gameDetails"],
    });
    return game;
  } catch (error) {
    console.log(error);
  }
};
