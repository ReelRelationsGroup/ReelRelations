const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");

async function getCommonMovie(actor1, actor2) {
    try {
      // Find movies involving actor1
      const actor1Movies = await Movie.findAll({
        include: [
          {
            model: Casts,
            where: {
              id: actor1,
            },
          },
        ],
      });
      // Find movies involving actor2 and also appeared in actor1's movies
      const commonMovies = actor1Movies.filter(movie => movie.casts.includes(actor2));
      console.log(commonMovies)
      return commonMovies;
    } catch (error) {
      console.error('Error retrieving common movies:', error);
      throw error;
    }
  }
    module.exports = getCommonMovie;
