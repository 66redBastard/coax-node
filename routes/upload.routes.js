require("dotenv").config();
const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "../public/files" });
// const upload = multer();
const jwt = require("jsonwebtoken");
const secretToken = process.env.JWT_SECRET;
const fs = require("fs");
const aws = require("aws-sdk");

aws.config.update({
  apiVersion: "2006-03-01",
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new aws.S3();

const uploadRoutes = Router();

uploadRoutes.post(
  "/uploadFile",
  upload.single("uploadFile"),
  async (req, res) => {
    //   console.log(req.user); TODO: WHY dis NOT WORKIN
    console.log(req.file);
    const token = req.headers.cookie.substring(4);
    const decodedToken = jwt.verify(token, secretToken);
    console.log("decoded", decodedToken);
    const fileSream = fs.createReadStream(req.file.path);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Body: fileSream,
      Key: req.file.filename,
    };

    try {
      console.log();
      const result = await s3.upload(uploadParams).promise();
      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
  }
);

// uploadRoutes.post("/uploadFile", upload.multiple("uploadFile"), (req, res) => {
//   console.log(req.file);
// });

module.exports = uploadRoutes;
