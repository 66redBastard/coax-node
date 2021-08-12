const { Router } = require("express");
const multer = require("multer");
// const upload = multer({ dest: "../public/files" });
const upload = multer();
const jwt = require("jsonwebtoken");
const secretToken = process.env.JWT_SECRET;

// const upload = require("../controller/upload.controller");

const uploadRoutes = Router();

uploadRoutes.post("/uploadFile", upload.single("uploadFile"), (req, res) => {
  //   console.log(req.user); TODO: WHY dis NOT WORKIN
  console.log(req.file);
  const token = req.headers.cookie.substring(4);
  const decodedToken = jwt.verify(token, secretToken);
  console.log("decoded", decodedToken);

  return res.status(200);
});

// uploadRoutes.post("/uploadFile", upload.multiple("uploadFile"), (req, res) => {
//   console.log(req.file);
// });

module.exports = uploadRoutes;
