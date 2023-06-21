const express = require("express");
const app = express();
const path = require("path");
const Movie = require("./db/Movie");
const Cast = require("./db/Cast");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));

// GET for a Single Movie
app.get("/api/movie/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(movie);
  } catch (err) {
    next(err);
  }
});

// GET for a Cast Member (Actor)
app.get("/api/cast/:id", async (req, res, next) => {
  try {
    const cast = await Cast.findByPk(req.params.id);
    res.send(cast);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
