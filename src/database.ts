import { Sequelize } from "sequelize";

// Instancia de Sequelize
const sequelize = new Sequelize("postgres://postgres:1234@localhost:5432/juegosapp", {
  logging: false, // Desactiva logs de SQL
});

// Importa los modelos
import User from "./models/User";
import Game from "./models/Game";
import UserGame from "./models/UserGame";

// Sincroniza la base de datos y aplica las asociaciones
async () => {
  try {
    await sequelize.sync({ force: true }); // Si usas force: true, esto elimina las tablas cada vez que se sincroniza
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
};

export default sequelize;
