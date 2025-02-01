import app from "./app";
import sequelize from "./database";
import "./models/Game";
import "./models/User";
import "./models/UserGame";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT as string;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Sincroniza la base de datos, puedes quitar 'force' en producción
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
})();
