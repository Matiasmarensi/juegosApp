import { Request, Response } from "express";
import dotenv from "dotenv";
import { gamesApi } from "../../services/gameServices/gamesApi";

dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const getAllGames = async (req: Request, res: Response) => {
  const { name } = req.query;
  console.log(req.query);

  const lowerCaseQuery = name?.toString().toLowerCase() || "";
  console.log("lowerCaseQuery:", lowerCaseQuery);
  try {
    const response = await gamesApi(lowerCaseQuery);

    res.send(response);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los juegos", error });
  }
};
