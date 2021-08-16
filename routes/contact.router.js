const { Router } = require("express");
const Contacts = require("../models/Contacts");

const contactRoutes = Router();

contactRoutes.post("/contacts", async (req, res) => {
  console.log(req.body);
  const { user_id, email } = req.body;
  const query = { _id: user_id };

  // const postContact = await Contacts.create({
  //   contacts: {
  //     profileId: String,
  //     userData: {
  //       email: String,
  //       usersId: String,
  //     },
  //   },
  //   // name: userData.email,
  //   // filePath: [result.Location],
  //   // filesNames: [req.file.originalname],
  //   // user: userData.user_id,
  // });
  return res.render("contacts");
});

contactRoutes.get("/contacts", async (req, res) => {
  return res.render("contacts");
});

module.exports = contactRoutes;
