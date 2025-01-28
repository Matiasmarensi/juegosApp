import { Request, Response } from "express";
import dotenv from "dotenv";
import { addFavorite } from "../../services/gameServices/addFavorite";
import { getGameById } from "./gameById";

dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const addFavoriteGame = async (req: Request, res: Response) => {
  const { userId, gameId, favoriteRating, completed, favorite } = req.body;

  try {
    // Llamar a getGameById para obtener los detalles del juego
    const gameDetails = await getGameById(URL, API_KEY, `games/${gameId}`);

    // Guardar el juego en favoritos con detalles obtenidos
    const userGame = await addFavorite(userId, gameId, favoriteRating, completed, favorite, gameDetails);

    res.json(userGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el juego a favoritos", error });
  }
};
