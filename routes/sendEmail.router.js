const { Router } = require("express");

const mailjet = require("node-mailjet").connect(
  "7ad5a0bb322e8009212376b5b9e8f8bf",
  "57f76420e93d28afbf9d34ffb273d49b"
);

const sendEmailRoutes = Router();

sendEmailRoutes.post("/send", async (req, res) => {
  console.log(req.body);
  const requestData = mailjet.post("/send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "66redbastard@gmail.com",
          Name: "red",
        },
        To: [
          {
            Email: req.body.email,
            Name: "red",
          },
        ],
        Subject: "Greetings from Mailjet.",
        TextPart: req.body.message,
        HTMLPart:
          "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3>",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  try {
    await requestData;
    return res.status(200).render("success");
  } catch (err) {
    console.log("mailerror", err);
    return res.status(404).render("error");
  }
});

module.exports = sendEmailRoutes;
