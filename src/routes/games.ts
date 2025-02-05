import express from "express";

import { getAllGames } from "../controllers/gamesControllers/getAllGames";
import { addFavoriteGame } from "../controllers/gamesControllers/addToFavorites";
import { getFavoriteGames } from "../controllers/gamesControllers/getAllFavorites";
import { authenticateUser } from "../middleware/authMiddleware";
import { removeFromFavorites } from "../controllers/gamesControllers/removeFromFavorites";

const gameRoutes = express.Router();

//get games raw api by name query
gameRoutes.get("/", getAllGames);
gameRoutes.patch("/favorite/:id", authenticateUser, removeFromFavorites);

gameRoutes.get("/favorite", authenticateUser, getFavoriteGames);
gameRoutes.post("/favorite", authenticateUser, addFavoriteGame);

export default gameRoutes;
