const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const user = new Schema({
  _id: { type: String, default: shortid.generate() },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide your email"],
  },
  mobile: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  loginToken: {
    type: String,
  },
  loginTokenExpires: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
    select: false,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
});

// user.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id }, "secret");
//   user.loginToken = token;
//   await user.save();
//   return token;
// };

module.exports = mongoose.model("users", user);
