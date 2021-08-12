const { Router } = require("express");
const uploadController = require("../controller/upload.controller");

const uploadRouter = Router();

app.post("/uploadFile", upload.single("myFile"), (req, res) => {
  console.log(req.file);
});
app.post("/uploadFile", upload.multiple("myFiles"), (req, res) => {
  console.log(req.file);
});

module.exports = uploadRouter;
