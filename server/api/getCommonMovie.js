const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");


async function getCommonMovie(actor1, actor2) {
    try {
      // Find movies involving actor1
      const movies1 = await Movie.findAll({
        include: [
          {
            model: Casts,
            where: {
              id: [actor1]
            },
          },
        ],
      });
      const movies2 = await Movie.findAll({
        include: [
          {
            model: Casts,
            where: {
              id: [actor2]
            },
          },
        ],
      });
      const filterFunc = (movie, moviesArray) => {
        for (let i = 0; i < moviesArray.length; i++) {
          if (moviesArray[i].id===movie.id) {
            return true;
          }
        }
        return false;
      }
      let commonMovies = movies1.filter(movie => filterFunc(movie, movies2))
      // Find movies involving actor2 and also appeared in actor1's movies


    //   const commonMovies = actor1Movies.filter(movie => 
    //     {console.log(movie.dataValues.casts.dataValues);
    //         return movie.dataValues.casts.includes(actor2)});
      console.log(commonMovies)
      return commonMovies;
    } catch (error) {
      console.error('Error retrieving common movies:', error);
      throw error;
    }
  }
    module.exports = getCommonMovie;
