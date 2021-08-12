const { Router } = require("express");
const upload = require("../controller/upload.controller");
const singleUpload = upload.single("image");

const uploadRoutes = Router();

uploadRoutes.post("/uploadFile", upload.single("myFile"), (req, res) => {
  console.log(req.file);
  const uid = req.params.id;

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    let update = { profilePicture: req.file.location };

    User.findByIdAndUpdate(uid, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});

uploadRoutes.post("/uploadFile", upload.multiple("myFiles"), (req, res) => {
  console.log(req.file);
});

module.exports = uploadRoutes;
