const conn = require("./conn");
const { BOOLEAN, STRING, INTEGER, FLOAT, DATE } = conn.Sequelize;

const Movie = conn.define(
  "movie",
  {
    adult: {
      type: BOOLEAN,
    },
    backdrop_path: {
      type: STRING,
    },
    original_language: {
      type: STRING,
    },
    original_title: {
      type: STRING,
    },
    overview: {
      type: STRING,
    },
    popularity: {
      type: FLOAT,
    },
    poster_path: {
      type: STRING,
    },
    release_date: {
      type: DATE,
    },
    title: {
      type: STRING,
    },
    video: {
      type: BOOLEAN,
    },
    vote_average: {
      type: FLOAT,
    },
    vote_count: {
      type: INTEGER,
    },
    id: {
      type: INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false, // set as false because api does not provide timestamps of when movie was added to database
  }
);

module.exports = Movie;
