// const accessKeyId = process.env.AWS_ACCESS_KEY || "xxxxxx";
// const secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";

// AWS.config.update({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
// });

// const s3 = new AWS.S3();
// app.use(
//   upload({
//     // https://github.com/expressjs/multer
//     limits: { fileSize: 100000 },
//     rename: function (fieldname, filename) {
//       return filename.replace(/\W+/g, "-").toLowerCase();
//     },
//     onFileUploadData: async function (file, data, req, res) {
//       // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//       const params = {
//         Bucket: "nodejs-bootcamp",
//         Key: "Gg.txt",
//         Body: data,
//         "Content-Type": "text/plain",
//       };
//       try {
//         await s3.putObject(params).promise();
//       } catch (e) {
//         console.log(e.message);
//       }
//     },
//   })
// );
