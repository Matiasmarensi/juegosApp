export const getGameById = async (id: string) => {
  const API_KEY = process.env.API_KEY || "";
  const URL = "https://api.rawg.io/api/";
  try {
    const url = `${URL}games/${id}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error al obtener el juego por ID:", error);
    console.error("Error al obtener el juego por ID:", error);
    throw error; // Relanza el error para manejarlo en otro nivel
  }
};
