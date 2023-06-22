const { Casts, Movie, castsMovieLink } = require("../db");

const buildGraph = async () => {
  const graph = {};

  try {
    // fetch all movies
    const movies = await Movie.findAll({
      include: {
        model: Casts,
        through: {
          model: castsMovieLink,
        },
      },
    });

    // Check if movie exist before iterationg through them
    if (!movies || movies.length === 0) {
      throw new Error("Movie NOT FOUND In The Database");
    }

    // Iterate through each movie and add co-casts to the graph
    for (const movie of movies) {
      const castsIds = movie.casts.map((casts) => casts.id);

      // For each casts in the movie, add edges to other casts in the same movie
      for (const castsId of castsIds) {
        if (!graph[castsId]) {
          graph[castsId] = [];
        }

        // Add co-casts to the graph
        for (const coCastsId of castsIds) {
          if (castsId !== coCastsId && !graph[castsId].includes(coCastsId)) {
            graph[castsId].push(coCastsId);
          }
        }
      }
    }
  } catch (error) {
    throw new Error(`Error Building the Graph: ${error.message}`);
  }

  return graph;
};

module.exports = buildGraph;
