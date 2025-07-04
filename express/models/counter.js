const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true }, // sayaç ismi, örn: "docCode-2025"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;