require("dotenv").config();
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.furej.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const mongoDB = mongoose.connect(mongoUrl, connectionOptions);

mongoose.connection.on("error", function (error) {
  console.log(error);
});

mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

module.exports = mongoDB;
