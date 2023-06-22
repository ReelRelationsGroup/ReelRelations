const Sequelize = require("sequelize");
const conn = require("./conn");
const INTEGER = conn.Sequelize;

// this model will link casts (actors) to movies to movie_cast

const castsMovieink = conn.define("castMovieLink", {
  castsId: {
    type: INTEGER,
    references: {
      model: "casts", // 'cast' refers to table name
      key: "id", // 'id' refers to column name in cast table
    },
  },
  moviesId: {
    type: INTEGER,
    references: {
      model: "movies", // 'movies' refers to table name
      key: "id", // 'id' refers to column name in movies table
    },
  },
  movie_castsId: {
    type: INTEGER,
    references: {
      model: "movie_casts", // 'movie_casts' refers to table name
      key: "id", // 'id' refers to column name in movie_casts table
    },
  },
});
