import UserGame from "../../models/UserGame";
import Game from "../../models/Game"; // Importamos el modelo de Game
import { platform } from "os";

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
    let userGame = await UserGame.findOne({
      where: {
        userId,
        gameId,
      },
    });

    if (userGame) {
      // Si el registro ya existe, actualizamos los valores en lugar de crear uno nuevo
      userGame.favorite = favorite;
      userGame.favoriteRating = favoriteRating;
      userGame.completed = completed;
      userGame.gameDetails = gameDetails;

      // Guardamos los cambios
      await userGame.save();
    } else {
      // Si no existe, buscamos el juego en la tabla Game
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
        gameDetails: {
          name: gameDetails.name,
          slug: gameDetails.slug,
          released: gameDetails.released,
          rating: gameDetails.rating,
          platforms: gameDetails.platformsString,
          genres: gameDetails.genresString,
          backgroundImage: gameDetails.background_image,
        },
      });
      console.log("Juego agregado a favoritos:", userGame);
      return userGame;
    }
  } catch (error) {
    console.error("Error al agregar el juego a favoritos:", error);
    throw error;
  }
};
