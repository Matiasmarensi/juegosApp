import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/";

export const gamesApi = async (lowerCaseQuery: string) => {
  try {
    const response = await fetch(`${URL}games?key=${API_KEY}&search=${lowerCaseQuery}&page_size=${10}`);

    console.log("data:", response);
    const data = await response.json();

    const games = data.results.map((game: any) => {
      return {
        tags: game.tags,
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
      };
    });

    return games;
  } catch (error) {
    console.error("Error al procesar la respuesta:", error);
    throw new Error("No se pudo procesar la respuesta de la API.");
  }
};
