import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";
import session from "express-session";
import { passport } from "./auth.js";

const PORT = 3000;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err}`)
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());

app.get("/failed", (_req, res) => {
  res.send("Login failed");
});

app.get("/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);

app.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("http://localhost:8080");
  }
);

app.get("/user-info", isLoggedIn, (req, res) => {
  res.json({
    userInfo: req.user._json,
  });
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout(() => { });
  res.send("Successfully logged out");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
