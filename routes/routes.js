const { Router } = require("express");
// const addValue = require("./middleware/addValue");
// const { getHelloMessage } = require("./services/myservice");

const router = Router();

router.get("/my-route", function (req, res) {
  return res.json({ value: req.myvalue });
});

router.post("/upload", function (req, res) {
  const { username } = req.body;

  const message = getHelloMessage(username);

  return res.json({ message });
});

module.exports = router;
