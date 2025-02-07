import { Request, Response } from "express";
import dotenv from "dotenv";
import { addFavorite } from "../../services/gameServices/addFavorite";
import { getGameById } from "./gameById";

dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const addFavoriteGame = async (req: Request, res: Response) => {
  const { gameId, favoriteRating, completed, favorite } = req.body;

  const userId = req.user?.uid;

  try {
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
    console.log("GAME DEL BACK", userGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el juego a favoritos", error });
  }
};
