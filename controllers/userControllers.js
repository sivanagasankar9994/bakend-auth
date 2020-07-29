// const express = require("express");
// var userRoutes = express.Router();
// const dotenv = require("dotenv");
// dotenv.config({ path: "../config.env" });
// const User = require("../models/UserSchema");
// const sendEmail = require("../utils/sendMail");
// const verifyAdmin = require("../utils/tokenCheck");
// // const counter = require("../models/counterSchema");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// // var nodemailer = require("nodemailer");
// // const crypto = require("crypto");
// process.env.SECRET_KEY = "secret";

// userRoutes.post("/", (req, res) => {
//   let today = new Date();
//   let { name, mobile, email, password } = req.body;
//   let newUser = {
//     name: name,
//     mobile: mobile,
//     password: password,
//     email: email,
//   };

//   if (!name || !email || !password) {
//     let errors = {};
//     errors.name = "Name is required";
//     errors.email = "Email is required";
//     errors.password = "password required";
//     res.status(404).json({
//       message: errors,
//     });
//   } else {
//     User.findOne({
//       email: email,
//     }).then((user) => {
//       if (!user) {
//         bcrypt.hash(req.body.password, 10, function (err, hash) {
//           newUser.password = hash;
//           User.create(newUser).then((user) => {
//             const subject = "New Users Create";
//             const message =
//               "User Created Successfully.please login into your email and password..";

//             sendEmail({
//               email: user.email,
//               subject: subject,
//               message,
//             });
//             res.status(201).json({
//               message: "User registered Success.",
//               // user: user,
//             });
//           });
//         });
//       } else {
//         res.status(404).json({ message: "User already exists" });
//       }
//     });
//   }
// });

// userRoutes.post("/login", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let errors = {};

//   if (!email && !password) {
//     errors.email = "Email Required";
//     errors.password = "Password Required";
//     res.send(404).json({ error: errors });
//   }
//   User.findOne({ email: email }).then((user) => {
//     console.log("users", user);
//     console.log("port", process.env.JWT_SECRET);
//     if (user) {
//       // if (user.password !== req.body.password) {
//       //   res.status(401).json({
//       //     message: "password does not match to this email",
//       //   });
//       // } else {
//       //   bcrypt.compare(user.password, password);
//       // }
//       if (bcrypt.compareSync(password, user.password)) {
//         const payload = {
//           _id: user._id,
//           name: user.name,
//           mobile: user.mobile,
//           email: user.email,
//           password: password,
//         };
//         let token = jwt.sign(payload, process.env.SECRET_KEY, {
//           expiresIn: 1440,
//         });
//         user.loginToken = token;
//         console.log("user token ", user);
//         res.status(200).json({
//           mesaage: "User Found",
//           userInfo: payload,
//           token: token,
//         });
//       } else {
//         res.status(401).json({
//           message: "password does not match to this email",
//         });
//       }
//     } else {
//       res.status(401).send({
//         type: "not-verified",
//         msg: "Your account has not been verified.",
//       });
//     }
//   });
// });

// // get users

// // userRoutes.get("/", verifyAdmin, (req, res) => {
// //   // const token = req.header("Authorization").replace("Bearer ", "");
// //   // const data = jwt.verify(token, process.env.SECRET_KEY);
// //   // console.log("token verify", token);
// // });
// userRoutes.get("/", verifyAdmin, async (req, res) => {
//   console.log("token verify");
//   User.find()
//     .then((data) => {
//       res.status(200).json({ message: "users get successfull", result: data });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Failed", errors: err });
//     });
// });

// userRoutes.post("/logout/:id", verifyAdmin, (req, res) => {
//   let id = req.params.id;
//   User.findById(id).then((user) => {
//     // console.log("Users", token);
//     user.loginToken = null;
//     // const tokenExp = {
//     //   expiresIn: 1516239022,
//     // };
//     // let token = jwt.sign(tokenExp, process.env.SECRET_KEY);
//     res.status(200).json({
//       mesaage: "LogOut SuccessFull",
//     });
//   });
//   // .catch((err) => {
//   //   res.status(404).json({
//   //     message: "logout id not Matched",
//   //     error: err,
//   //   });
//   // });
// });

// module.exports = userRoutes;
