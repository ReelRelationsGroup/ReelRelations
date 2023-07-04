require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const degreesOfSeparation = require("./api/degreesOfSeparation");

// app.use((req, res, next) => {
//   console.log(req.url), next();
// });

app.use(express.json());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log(accessToken);
      done(null, profile);
    }
  )
);

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
});

app.get(
  "/api/auth/oauth/github",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to the homepage
    res.redirect("/");
  }
);

// Additional routes
app.use("/api/auth", require("./api/auth"));
app.use("/api/degreesOfSeparation", degreesOfSeparation);
app.use("/api/movies", require("./api/movies"));
app.use("/api/actors", require("./api/actors"));
app.use("/api/users", require("./api/user"));
app.use("/api/favorites", require("./api/favorites"));

module.exports = app;
