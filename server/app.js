const express = require("express");
const app = express();
const path = require("path");
const Movie = require("./db/Movie");
const Casts = require("./db/Casts");
const degreesOfSeparation = require("./api/degreesOfSeparation");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));
app.use("/api/degreesOfSeparation", degreesOfSeparation);
app.use("/api/movies", require("./api/movies"))
app.use("/api/actors", require("./api/actors"));
app.use("/api/users", require("./api/user"))

// GET for a Casts Member (Actor)
app.get("/api/casts/:id", async (req, res, next) => {
  try {
    const casts = await Casts.findByPk(req.params.id);
    res.send(casts);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
