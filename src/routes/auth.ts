import express from "express";
import firebaseAdmin from "firebase-admin";
import User from "../models/User";

import path from "path";

const authRoutes = express.Router();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    path.join(__dirname, "juegosapp-e571e-firebase-adminsdk-fbsvc-bc8789e1dc.json")
  ),
});

authRoutes.post("/google-auth", async (req, res) => {
  const { token } = req.body;

  try {
    // Verificar el token con Firebase
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    // Obtener la información del usuario desde Firebase
    const { uid, email, name } = decodedToken;

    // Verificar si el usuario ya existe en la base de datos
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Si no existe, crear un nuevo usuario
      user = await User.create({ name, email });
    }

    // Enviar la información del usuario al frontend
    res.json({ user, message: "Usuario autenticado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar el token", error });
  }
});

export default authRoutes;
