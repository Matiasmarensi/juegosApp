import express from "express";

import authRoutes from "./routes/auth";
import gameRoutes from "./routes/games";
import cors from "cors";

// Inicializar Firebase Admin con el archivo de credenciales
//add cors

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/games", gameRoutes);

// Ruta para crear un usuario
// app.post("/users", async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.create({ name, email });
//   res.json(user);
// });

export default app;
