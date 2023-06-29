const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");
const { Op } = require("sequelize");

async function getCommonMovie(actor1, actor2) {
  try {
    const movies1 = await Movie.findAll({
      include: [
        {
          model: Casts,
          where: {
            id: actor1,
          },
        },
      ],
    });
    const movies2 = await Movie.findAll({
      include: [
        {
          model: Casts,
          where: {
            id: actor2,
          },
        },
      ],
    });
    const commonMovies = movies1.filter((movie) =>
      movies2.some((m) => m.id === movie.id)
    );

    return commonMovies;
  } catch (error) {
    console.error("Error retrieving common movies:", error);
    throw error;
  }
}

module.exports = getCommonMovie;
