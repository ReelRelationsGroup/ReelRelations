const { Casts, Movie, castsMovieLink } = require("../db");

const buildGraph = async () => {
  const graph = {};

  try {
    // Fetch all movies with casts information
    const movies = await Movie.findAll({
      include: [
        {
          model: Casts,
          as: "casts",
          through: {
            model: castsMovieLink,
            as: "castsMovieLink",
          },
        },
      ],
    });

    if (!movies || movies.length === 0) {
      throw new Error("No movies found in the database.");
    }

    // Build the graph
    for (const movie of movies) {
      const casts = movie.get("casts");

      for (const cast of casts) {
        const castId = cast.id;

        if (!graph[castId]) {
          graph[castId] = [];
        }

        const coCasts = casts.filter((c) => c.id !== castId);
        const coCastIds = coCasts.map((c) => c.id);

        graph[castId].push(...coCastIds);
      }
    }
  } catch (error) {
    throw new Error(`Error building the graph: ${error.message}`);
  }

  return graph;
};

module.exports = buildGraph;
