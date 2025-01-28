import express from "express";

import { getAllGames } from "../controllers/gamesControllers/getAllGames";
import { addFavoriteGame } from "../controllers/gamesControllers/addToFavorites";

const gameRoutes = express.Router();

//get games raw api by name query
gameRoutes.get("/", getAllGames);

gameRoutes.post("/favorite", addFavoriteGame);
export default gameRoutes;
