import UserGame from "../../models/UserGame";

export const getGamebyId = async (id: string) => {
  try {
    const game = await UserGame.findByPk(id, {
      attributes: ["id", "userId", "gameId", "completed", "favorite", "gameDetails"],
    });
  } catch (error) {
    console.log(error);
  }
};
