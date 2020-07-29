const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: String,
  street: String,
});

module.exports = mongoose.model("address", addressSchema);
