const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");
const bfs = require("../utils/DegreesOfSeparation"); // Update import statement
const buildGraph = require("../utils/graphBuilder");

// GET for degrees of separation between two actors
app.get("/:castsId/:casts2Id", async (req, res, next) => {
  try {
    const { castsId, casts2Id } = req.params;

    const graph = await buildGraph();
    // Using the bfs function to find the path between the two actors
    let path = bfs(graph, castsId, casts2Id);

    // Calculate degrees of separation
    let degreesOfSeparation = path ? path.length - 1 : null;

    // Sending the result as a JSON response
    res.json({ degreesOfSeparation });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
