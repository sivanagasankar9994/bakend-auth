const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singleRelationSchema = new Schema({
  email: String,
  name: String,
  password: String,
  user: [{ type: Schema.Types.ObjectId, ref: "address" }],
});

module.exports = mongoose.model("singleRealtion", singleRelationSchema);
