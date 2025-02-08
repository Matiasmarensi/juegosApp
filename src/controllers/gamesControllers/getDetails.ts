import { Request, Response } from "express";

import { getGameById } from "./getDetailbyID";

export const getDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("IDX", id);

    const gameDetail = await getGameById(id);
    console.log("DEtail", gameDetail);
    res.send(gameDetail);
  } catch (error) {
    console.log(error);
  }
};
