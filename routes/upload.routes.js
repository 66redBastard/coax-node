const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "../public/files" });
const jwt = require("jsonwebtoken");
const secretToken = process.env.JWT_SECRET;
const fs = require("fs");
const aws = require("aws-sdk");
const File = require("../models/File");

aws.config.update({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new aws.S3();

const uploadRoutes = Router();

const getUserData = (req) => {
  const token = req.headers.cookie.substring(4);
  const decodedToken = jwt.verify(token, secretToken);
  // console.log("decoded", decodedToken);
  return decodedToken;
};

uploadRoutes.post(
  "/uploadFile",
  upload.single("uploadFile"),
  async (req, res) => {
    //   console.log(req.user); TODO: WHY dis NOT WORKIN
    // console.log(req.file);
    const userData = getUserData(req);
    const fileSream = fs.createReadStream(req.file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Body: fileSream,
      Key: req.file.filename,
    };

    try {
      const result = await s3.upload(uploadParams).promise();
      console.log(result);

      const userFiles = await File.findOne({ user: userData.user_id });

      if (!userFiles) {
        const uploadFirstFile = await File.create({
          name: userData.email,
          filePath: [result.Location],
          filesNames: [req.file.originalname],
          user: userData.user_id,
        });
        const filesCollection = await File.findOne({ user: userData.user_id });
        return res.status(200).render("library", {
          collection: filesCollection,
        });
      } else {
        const uploadAnotherFile = await File.updateOne(
          { user: userData.user_id },
          {
            $push: {
              filePath: result.Location,
              filesNames: req.file.originalname,
            },
          }
        );
        const filesCollection = await File.findOne({ user: userData.user_id });
        // console.log("show collection: ", filesCollection);
        return res.status(200).render("library", {
          collection: filesCollection,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
  }
);

// add auth middleware
uploadRoutes.get("/library", async (req, res) => {
  const userData = getUserData(req);
  const filesCollection = await File.findOne({ user: userData.user_id }); // duplicated code needs refactor
  console.log("get file data === ", filesCollection);
  return res.status(200).render("library", {
    collection: filesCollection,
  });
});

// uploadRoutes.post("/uploadFile", upload.multiple("uploadFile"), (req, res) => {
//   console.log(req.file);
// });

module.exports = uploadRoutes;
