const multer = require("multer");
const File = require("../models/File");
const aws = require("aws-sdk");
const s3 = new aws.S3();

aws.config.update({
  apiVersion: "2006-03-01",
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_SECRET_KEY,
  region: "eu-west-1",
});

const upload = multer();

module.exports = upload;
