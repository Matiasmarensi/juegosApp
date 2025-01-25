import express from "express";

import { getAllGames } from "../controllers/gamesControllers/getAllGames";

const gameRoutes = express.Router();

//get games raw api by name query
gameRoutes.get("/", getAllGames);

export default gameRoutes;
