import express from "express";

import { getAllGames } from "../controllers/gamesControllers/getAllGames";
import { addFavoriteGame } from "../controllers/gamesControllers/addToFavorites";
import { getFavoriteGames } from "../controllers/gamesControllers/getAllFavorites";
import { authenticateUser } from "../middleware/authMiddleware";
import { removeFromFavorites } from "../controllers/gamesControllers/removeFromFavorites";
import { getDetails } from "../controllers/gamesControllers/getDetails";
import { getTrending } from "../controllers/gamesControllers/getTrending";

const gameRoutes = express.Router();

//get games raw api by name query
gameRoutes.get("/", getAllGames);
gameRoutes.get("/trending", getTrending);
gameRoutes.patch("/favorite/:id", authenticateUser, removeFromFavorites);

gameRoutes.get("/favorite", authenticateUser, getFavoriteGames);
gameRoutes.post("/favorite", authenticateUser, addFavoriteGame);
gameRoutes.get("/favorite/:id", authenticateUser, getDetails);

export default gameRoutes;
