require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const degreesOfSeparation = require("./api/degreesOfSeparation");
const User = require("./db/User");

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
    async function (accessToken, refreshToken, profile, done) {
      try {
        const githubUsername = profile.username; // Extract the GitHub username from the profile

        // Find or create a user with the GitHub username
        let user = await User.findOne({ where: { username: githubUsername } });

        if (!user) {
          // If the user does not exist, create a new user
          user = await User.create({
            username: githubUsername,
            password: `random-${Math.random()}`, // Set a random password for the user
          });
        }

        // Update the username of the user
        await user.update({
          username: githubUsername,
        });

        // Return the user object
        return done(null, user);
      } catch (err) {
        done(err);
      }
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

// app.use((req, res, next) => {
//   if (req.isAuthenticated()) {
//     console.log("Authenticated Through Passport JS");
//   } else {
//     console.log("Not Authenticated Through Passport JS");
//   }
//   next();
// });

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
});

app.get(
  "/api/auth/oauth/github",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("User Authenticated Through GitHub");
    // Successful authentication, redirect to the homepage
    res.redirect("/");
  }
);

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated Through Passport JS");
  } else {
    console.log("Not Authenticated Through Passport JS");
  }
  next();
});

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, allow access to the next middleware or route handler
    return next();
  } else {
    // User is not authenticated, redirect to the login page or return an unauthorized response
    return res.status(401).send("Unauthorized");
  }
};

// Additional routes
app.use("/api/auth", require("./api/auth"));
app.use("/api/degreesOfSeparation", degreesOfSeparation);
app.use("/api/movies", require("./api/movies"));
app.use("/api/actors", require("./api/actors"));
app.use("/api/users", require("./api/user"));
app.use("/api/favorites", require("./api/favorites"));

module.exports = app;
