import { getGamebyId } from "../../services/gameServices/getGamebyId";
import { Request, Response } from "express";

export const getDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gameDetail = getGamebyId(id);
    console.log(gameDetail);
  } catch (error) {
    console.log(error);
  }
};
