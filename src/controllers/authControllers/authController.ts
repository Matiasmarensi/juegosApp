import { Request, Response } from "express";
import firebaseAdmin from "firebase-admin";
import path from "path";
import { findUser } from "../../services/authServices/authService";
import { GoogleAuthDTO } from "../../dtos/GoogleDtos";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    path.join(__dirname, "../../../juegosapp-e571e-firebase-adminsdk-fbsvc-bc8789e1dc.json")
  ),
});

const googleAuth = async (req: Request, res: Response) => {
  const { token, email }: GoogleAuthDTO = req.body; // Ahora recibimos el email también

  try {
    // Verificar el token con Firebase

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    // Obtener la información del usuario desde Firebase
    const { user_id, email, name } = decodedToken;

    // Verificar si el usuario ya existe en la base de datos
    if (!email) {
      res.status(400).json({ message: "El email no está presente en el token" });
      return;
    }
    let user = await findUser(email, user_id, name);

    // Enviar la información del usuario al frontend
    res.json({ user, message: "Usuario autenticado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar el token", error });
  }
};

export default googleAuth;
