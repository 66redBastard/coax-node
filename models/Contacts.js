const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  usersList: [
    {
      email: String,
      userId: mongoose.Types.ObjectId,
    },
  ],
  contacts: {
    profileId: mongoose.Types.ObjectId,
    userData: {
      email: String,
      usersId: String,
    },
  },
});

module.exports = mongoose.model("Contacts", contactSchema);
