const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");
const { Op } = require("sequelize");
const buildGraph = require("../utils/graphBuilder");
const bfs = require("../utils/DegreesOfSeparation");
const getCommonMovie = require("./getCommonMovie");

app.get("/:castsId/:casts2Id", async (req, res, next) => {
  try {
    const { castsId, casts2Id } = req.params;

    const graph = await buildGraph();
    console.log(castsId, casts2Id);

    let path = bfs(graph, castsId, casts2Id);
    if (path === null) {
      return res.json({ degreesOfSeparation: null, path: [], moviesPath: [] });
    }

    let degreesOfSeparation = path.length - 1;

    let moviesPath = [];
    for (let i = 0; i < path.length - 1; i++) {
      const commonMovies = await getCommonMovie(path[i], path[i + 1]);
      moviesPath.push(commonMovies);
    }

    res.json({ degreesOfSeparation, path, moviesPath });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
