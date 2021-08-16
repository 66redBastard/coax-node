require("rootpath")();
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const sendEmailRoutes = require("./routes/sendEmail.router");
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

app.get("/profile", verifyToken, async (req, res) => {
  // console.log("profile response === ", res);
  const userID = res.req.user.user_id;
  const userData = await User.findOne({ _id: userID });
  console.log("data ====", userData);
  res.render("profile", { collectionUser: userData });
});
// app.get("/library", verifyToken, (req, res) => {
//   console.log("response get library === ", res);
//   res.render("library", { collection: res });
// });
// app.get("/uploadFile", verifyToken, (req, res) => res.render("library"));
// app.get("/send", verifyToken, (req, res) => res.render("success"));
app.use(authRoutes);
app.use(uploadRoutes);
app.use(sendEmailRoutes);

// server
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PORT || 80
    : process.env.PORT_LOCAL;

app.listen(port, function () {
  app.db = mongoDB;
  console.log("Server listening on port " + port);
});
