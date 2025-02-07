import { Request, Response } from "express";
import dotenv from "dotenv";
import { platform } from "os";

dotenv.config();
const API_KEY = process.env.API_KEY;
const URL = "https://api.rawg.io/api/";

// Función para obtener la fecha en formato YYYY-MM-DD
const getFormattedDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getTrending = async (req: Request, res: Response) => {
  const today = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(today.getMonth() - 10);

  const oneYearAhead = new Date();
  oneYearAhead.setFullYear(today.getFullYear() + 1);

  const startDate = getFormattedDate(twoMonthsAgo);
  const endDate = getFormattedDate(oneYearAhead);

  const url = `${URL}games?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-released&page_size=30`;

  console.log("url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    const games = data.results.map((game: any) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
      platforms: game.platforms?.map((platform: any) => platform?.platform?.name).join(", ") || "--",
      genres: game.genres.map((genre: any) => genre?.name).join(", ") || "--",
    }));

    res.json(games);
  } catch (error) {
    res.status(500).json(error);
  }
};
