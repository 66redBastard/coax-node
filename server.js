require("rootpath")();
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./config/db");
const multer = require("multer");
const upload = multer();
const AWS = require("aws-sdk");
const authRoutes = require("./routes/auth.routes");
const verifyToken = require("./middleware/auth");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json()); // Used to parse JSON bodies. Body parser is deprecated
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(__dirname + "/public"));

// View engine
app.set("view engine", "ejs");

// api routes
app.get("/", (req, res) => {
  res.render("home");
  res.end(console.log("render home"));
});
app.get("/profile", verifyToken, (req, res) => res.render("profile"));
app.use(authRoutes);

// server
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PORT || 80
    : process.env.PORT_LOCAL;

app.listen(port, function () {
  app.db = mongoDB;
  console.log("Server listening on port " + port);
});
