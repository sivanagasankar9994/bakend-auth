const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  cars: [{ type: Schema.Types.ObjectId, ref: "car" }],
});

const Person = mongoose.model("person", personSchema);
module.exports = Person;
