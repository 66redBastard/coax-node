const { Router } = require("express");

const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
);

const sendEmailRoutes = Router();

sendEmailRoutes.post("/send", async (req, res) => {
  console.log(req.body);
  const requestData = mailjet.post("send", { version: "v3.1" }).request({
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
    let response = await requestData;
    console.log(response);
    return res.status(200).render("success");
  } catch (err) {
    console.log("mailerror", err);
    return res.status(404).render("error");
  }
});

module.exports = sendEmailRoutes;
