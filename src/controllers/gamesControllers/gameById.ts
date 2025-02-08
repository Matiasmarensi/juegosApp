export const getGameById = async (baseUrl: string, apiKey: string, endpoint: string) => {
  console.log("URLGAMEID", baseUrl, apiKey, endpoint);
  try {
    const url = `${baseUrl}${endpoint}?key=${apiKey}`;
    console.log(url);
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
