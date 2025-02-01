import express from "express";

import { getAllGames } from "../controllers/gamesControllers/getAllGames";
import { addFavoriteGame } from "../controllers/gamesControllers/addToFavorites";
import { getFavoriteGames } from "../controllers/gamesControllers/getAllFavorites";
import { authenticateUser } from "../middleware/authMiddleware";

const gameRoutes = express.Router();

//get games raw api by name query
gameRoutes.get("/", getAllGames);

gameRoutes.get("/favorite", authenticateUser, getFavoriteGames);
gameRoutes.post("/favorite", addFavoriteGame);

export default gameRoutes;
