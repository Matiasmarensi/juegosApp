export const gamesApi = async (URL: string, API_KEY: string, lowerCaseQuery: string) => {
  const response = await fetch(`${URL}games?key=${API_KEY}&search=${lowerCaseQuery}&page_size=${10}`);

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
};
