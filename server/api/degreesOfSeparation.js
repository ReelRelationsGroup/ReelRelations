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
    console.log(castsId, casts2Id);
    // Using the bfs function to find the path between the two actors
    let path = bfs(graph, 2, 3);

    // Calculate degrees of separation
    let degreesOfSeparation = path ? path.length - 1 : null;

    // Sending the result as a JSON response
    res.json({ degreesOfSeparation });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
