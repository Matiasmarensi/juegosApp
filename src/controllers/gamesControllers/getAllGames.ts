import { Request, Response } from "express";
import dotenv from "dotenv";
import { gamesApi } from "../../services/gameServices/gamesApi";
dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const getAllGames = async (req: Request, res: Response) => {
  const { name } = req.query;
  const lowerCaseQuery = name?.toString().toLowerCase() || "";
  try {
    const response = await gamesApi(URL, API_KEY, lowerCaseQuery);

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los juegos", error });
  }
};
