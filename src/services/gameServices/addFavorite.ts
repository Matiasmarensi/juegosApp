import UserGame from "../../models/UserGame";
import Game from "../../models/Game"; // Importamos el modelo de Game

export const addFavorite = async (
  userId: number,
  gameId: number,
  favoriteRating: number,
  completed: boolean,
  favorite: boolean,
  gameDetails: any
) => {
  try {
    // Primero, verificamos si el juego ya existe en la base de datos
    let game = await Game.findByPk(gameId);

    // Si no existe, lo creamos
    if (!game) {
      game = await Game.create({
        id: gameId,
        name: gameDetails.name,
        slug: gameDetails.slug,
        released: gameDetails.released,
        rating: gameDetails.rating,
      });
    }

    // Luego, creamos el registro en UserGame
    const userGame = await UserGame.create({
      userId,
      gameId,
      favoriteRating,
      completed,
      favorite,
      gameDetails,
    });

    console.log("Juego añadido a favoritos:", userGame.userId, userGame.gameId, userGame.favoriteRating, gameDetails);
    return userGame;
  } catch (error) {
    console.error("Error al agregar el juego a favoritos:", error);
    throw error;
  }
};
