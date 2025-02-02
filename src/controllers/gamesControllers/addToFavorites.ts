import { Request, Response } from "express";
import dotenv from "dotenv";
import { addFavorite } from "../../services/gameServices/addFavorite";
import { getGameById } from "./gameById";

dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const addFavoriteGame = async (req: Request, res: Response) => {
  const { userId, gameId, favoriteRating, completed, favorite } = req.body;
  console.log("Datos recibidos:", { userId, gameId, favoriteRating, completed, favorite });

  try {
    // Llamar a getGameById para obtener los detalles del juego
    const gameDetails = await getGameById(URL, API_KEY, `games/${gameId}`);

    const { name, released, rating, slug, description, platforms, genres, background_image } = gameDetails;

    const genresString =
      genres && genres.length > 0 ? genres.map((genre: any) => genre.name).join(", ") : "No genres available";
    const platformsString = platforms ? platforms.map((platform: any) => platform.platform.name).join(", ") : "";

    const userGame = await addFavorite(userId, gameId, favoriteRating, completed, favorite, {
      name,
      released,
      rating,
      slug,
      description,
      platformsString,
      genresString,
      background_image,
    });
    res.json(userGame);
    console.log("Juego añadido a favoritos: devuelto ppor la base de datos", userGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el juego a favoritos", error });
  }
};
