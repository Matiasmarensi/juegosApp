import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY || "";
const URL = "https://api.rawg.io/api/games";

export const gamesApi = async (lowerCaseQuery: string) => {
  try {
    const response = await fetch(`${URL}?key=${API_KEY}&search=${lowerCaseQuery}&page_size=10`);
    console.log("URL de búsqueda:", `${URL}?key=${API_KEY}&search=${lowerCaseQuery}&page_size=10`);

    const data = await response.json();

    // Usamos Promise.all para esperar que todas las promesas se resuelvan
    const games = await Promise.all(
      data.results.map(async (game: any) => {
        try {
          // Hacemos una segunda petición para obtener la descripción del juego
          const gameDetailsResponse = await fetch(`${URL}/${game.id}?key=${API_KEY}`);
          const gameDetails = await gameDetailsResponse.json();

          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            released: game.released,
            platforms: game.platforms?.map((platform: any) => platform?.platform?.name).join(", ") || "--",
            genres: game.genres.map((genre: any) => genre?.name).join(", ") || "--",
            description: gameDetails.description_raw || "No description available",
          };
        } catch (error) {
          console.error(`Error obteniendo detalles para el juego ${game.id}:`, error);
          return null; // O podrías devolver un objeto con datos por defecto
        }
      })
    );

    return games.filter((game) => game !== null); // Filtramos los juegos que no se pudieron obtener
  } catch (error) {
    console.error("Error al procesar la respuesta:", error);
    throw new Error("No se pudo procesar la respuesta de la API.");
  }
};
