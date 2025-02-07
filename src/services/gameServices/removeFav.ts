import { where } from "sequelize";

import UserGame from "../../models/UserGame";

export const removeFav = async (id: string, uid: string) => {
  try {
    //buscar el juego y cambiar la propiedad favorite a false
    const [updatedRows] = await UserGame.update({ favorite: false }, { where: { id: id, userId: uid } });
    console.log("updatedRows", updatedRows);
    if (updatedRows === 0) {
      throw new Error("No se encontró el juego o ya no está en favoritos.");
    }

    return { message: "Juego eliminado de favoritos correctamente." };
  } catch (error) {
    console.error("Error al eliminar el juego de favoritos:", error);
    throw error;
  }
};
