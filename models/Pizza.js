const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  id: "",
  name: "",
  date: {
    type: Date,
    default: Date.now,
  },
  vegan: Boolean,
  stuff: { type: Array, default: [] },
});

pizzaSchema.methods.changeStuff = async function () {
  this.stuff.push = "egg";
  return this.save();
};

const Pizza = mongoose.model("pizza", pizzaSchema);

module.exports = Pizza;
