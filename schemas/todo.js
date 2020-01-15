const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: String,
  done: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", todoSchema);
