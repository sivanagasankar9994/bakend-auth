const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const practiceSchema = new Schema({
  _id: { type: String, default: shortid.generate() },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("practice", practiceSchema);
