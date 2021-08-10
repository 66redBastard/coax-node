require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./config/db");
const multer = require("multer");
const upload = multer();
const AWS = require("aws-sdk");
const routesUsers = require("./routes/user.controller");

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies. Body parser is deprecated
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// api routes
app.get("/", (req, res) => {
  res.send({ message: "Hello WWW!" });
  res.end(console.log("get req end"));
});

app.use("/routes", routesUsers);

// server
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PORT || 80
    : process.env.PORT_LOCAL;

app.listen(port, function () {
  app.db = mongoDB;
  console.log("Server listening on port " + port);
});
