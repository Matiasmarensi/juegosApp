import express from "express";
import dotenv from "dotenv";

const gameRoutes = express.Router();
dotenv.config();

const API_KEY = process.env.API_KEY;

const URL = "https://api.rawg.io/api/";

//get games raw api by name query
gameRoutes.get("/games", async (req, res) => {
  const { name } = req.query;
  const lowerCaseQuery = name?.toString().toLowerCase();
  try {
    const response = await fetch(`${URL}games?key=${API_KEY}&search=${lowerCaseQuery}&page_size=${10}`);
    const data = await response.json();
    const games = data.results.map((game: any) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
      };
    });
    console.log(games);
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los juegos", error });
  }
});

export default gameRoutes;
