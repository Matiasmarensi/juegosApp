import { Request, Response } from "express";
import { removeFav } from "../../services/gameServices/removeFav";

interface AuthenticatedRequest extends Request {
  user?: { uid: string };
}

export const removeFromFavorites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log("hola");
  console.log("hola");
  console.log(req.params); // Asegúrate de que el gameId esté llegando correctamente en los params
  const { id } = req.params;

  if (!req.user || !req.user.uid) {
    res.status(401).json({ message: "Unauthorized: No user found" });
    return;
  }

  const { uid } = req.user;

  try {
    const userGame = await removeFav(id, uid);
    if (!userGame) {
      res.status(404).json({ message: "Game not found in favorites" });
      return;
    }

    res.json({ message: "Game removed from favorites" });
  } catch (error) {
    console.error("Error removing game from favorites:", error);
    res.status(500).json({ message: "Error removing game from favorites" });
  }
};
