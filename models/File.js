const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "must have a name"],
  },
  filePath: { type: Array },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
