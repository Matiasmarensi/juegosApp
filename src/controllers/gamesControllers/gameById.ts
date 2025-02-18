export const gameById = async (baseUrl: string, apiKey: string, endpoint: string) => {
  try {
    const url = `${baseUrl}${endpoint}?key=${apiKey}`;

    const response = await fetch(url);
    console.log("RESPONSE DETAIL", response);

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
