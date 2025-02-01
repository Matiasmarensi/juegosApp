import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token", error });
  }
};
