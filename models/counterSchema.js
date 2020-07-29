const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counter = new Schema({
  _id: "user_id",
  sequence_value: 0,
});

module.exports = mongoose.model("counters", counter);
