import { Request, Response } from "express";
import UserGame from "../../models/UserGame";
import Game from "../../models/Game";

interface AuthenticatedRequest extends Request {
  user?: { uid: string };
}
interface UserPayload {
  uid: string;
  // ... other user properties
}

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any; // Make 'user' optional
    }
  }
}

export const getFavoriteGames = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized: No user found" });
  }

  try {
    const uid = req.user?.uid; // `uid` del usuario autenticado

    // Buscar los juegos favoritos del usuario en la base de datos
    const favoriteGames = await UserGame.findAll({
      where: { userId: uid, favorite: true }, // Asegúrate de filtrar solo los favoritos
      include: [
        {
          model: Game, // Incluir el modelo 'Game'
          attributes: ["id", "name", "slug", "released", "rating"], // Especifica qué campos quieres traer
        },
      ],
    });

    res.json(favoriteGames);
  } catch (error) {
    console.error("Error fetching favorite games:", error);
    res.status(500).json({ message: "Error fetching favorite games" });
  }
};
