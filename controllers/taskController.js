const express = require("express");
var userRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const User = require("../models/UserSchema");
const sendEmail = require("../utils/sendMail");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const tokenCheck = require("../utils/tokenCheck");

process.env.SECRET_KEY = "secret";

const signToken = (user) => {
  const payload = {
    _id: user._id,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

// userRoutes.post("/", (req, res) => {
//   let { name, mobile, email, password } = req.body;
//   let newUser = {
//     name: name,
//     mobile: mobile,
//     password: password,
//     email: email,
//   };
//   User.findOne({
//     email: email,
//   }).then((user) => {
//     if (!user) {
//       bcrypt.hash(req.body.password, 10, function (err, hash) {
//         newUser.password = hash;
//         User.create(newUser).then((user) => {
//           // const payload = {
//           //   _id: user._id,
//           // };
//           // let token = jwt.sign(payload, process.env.SECRET_KEY);
//           const token = signToken(user);
//           user.loginToken = token;
//           // user.tokens = user.tokens.concat({ token });
//           user.save();
//           res.status(201).json({
//             message: "User registered Success.",
//             user: user,
//             token: token,
//           });
//         });
//       });
//     } else {
//       res.status(404).json({ message: "User already exists" });
//     }
//   });
// });

exports.createTask = (req, res) => {
  let { name, mobile, email, password, role } = req.body;
  let newUser = {
    name: name,
    mobile: mobile,
    password: password,
    email: email,
    role: role,
  };
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        newUser.password = hash;
        User.create(newUser).then((user) => {
          // const payload = {
          //   _id: user._id,
          // };
          // let token = jwt.sign(payload, process.env.SECRET_KEY);
          const token = signToken(user);
          user.loginToken = token;
          // user.tokens = user.tokens.concat({ token });
          user.save();
          res.status(201).json({
            message: "User registered Success.",
            user: user,
            token: token,
          });
        });
      });
    } else {
      res.status(404).json({ message: "User already exists" });
    }
  });
};

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        // const payload = {
        //   _id: user._id,
        // };
        // let token = jwt.sign(payload, process.env.SECRET_KEY);
        // user.tokens = user.tokens.concat({ token });
        const token = signToken(user);
        user.loginToken = token;
        user.save();
        // console.log("user token ", user);
        res.status(200).json({
          mesaage: "User Found",
          user: user,
          //   userInfo: payload,
          token: token,
        });
      } else {
        res.status(401).json({
          message: "password does not match to this email",
        });
      }
    } else {
      res.status(401).send({
        type: "not-verified",
        msg: "Your account has not been verified.",
      });
    }
  });
};

// userRoutes.post("/login", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   User.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (bcrypt.compareSync(password, user.password)) {
//         // const payload = {
//         //   _id: user._id,
//         // };
//         // let token = jwt.sign(payload, process.env.SECRET_KEY);
//         // user.tokens = user.tokens.concat({ token });
//         const token = signToken(user);
//         user.loginToken = token;
//         user.save();
//         // console.log("user token ", user);
//         res.status(200).json({
//           mesaage: "User Found",
//           user: user,
//           //   userInfo: payload,
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
exports.getAllUsers = (req, res) => {
  console.log("token verify");
  User.find()
    .then((data) => {
      res.status(200).json({ message: "users get successfull", result: data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed", errors: err });
    });
};

// userRoutes.get("/", auth, async (req, res) => {
//   console.log("token verify");
//   User.find()
//     .then((data) => {
//       res.status(200).json({ message: "users get successfull", result: data });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Failed", errors: err });
//     });
// });

exports.logout = (req, res) => {
      let id = req.user._id;
      User.findById(id)
        .then((user) => {
          user.loginToken = null;
          user.save();
          res.status(200).json({
            mesaage: "LogOut SuccessFull",
            user,
          });
        })
        .catch((err) => {
          res.status(404).json({
            message: "logout id not Matched",
            error: err,
          });
        });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("name _id mobile email")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          user: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateUser = (req, res) => {
  let id = req.params.id;
  let { name, email, mobile } = req.body;
  User.findOne({
    _id: id,
  })
    .then((user) => {
      // console.log("responce", user);
      if (id == user._id) {
        user.name = name;
        user.email = email;
        user.mobile = mobile;
        User.create(user);
        res.status(200).json({ message: "updated success", user: user });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "id not matched", errors: err });
    });
};

// userRoutes.post("/logout/:id", auth, (req, res) => {
//   let id = req.user._id;
//   // const token = req.header("token");
//   // console.log("req", token);
//   User.findById(id).then((user) => {
//     // user.token !== token;
//     // console.log("userbyid", user);
//     user.loginToken = null;
//     user.save();
//     res.status(200).json({
//       mesaage: "LogOut SuccessFull",
//       user,
//     });
//   });
//   // .catch((err) => {
//   //   res.status(404).json({
//   //     message: "logout id not Matched",
//   //     error: err,
//   //   });
//   // });
//   // console.log("request token", req.user.loginToken);
//   // console.log("normal token", req.token);
//   // req.user.loginToken == undefined;
//   // req.token == undefined;
//   // //   req.user.tokens = req.user.tokens.filter((token) => {
//   // //     return token.token !== req.token
//   // // })
//   // req.user.save();
//   // delete req.user;
//   // console.log("requsers", req.user);

//   // res.send();
// });

// module.exports = userRoutes;

exports.deleteUser = (req, res, next) => {
  let id = req.params.id;
  User.findOne({
    _id: id,
  })
    .then((user) => {
      // console.log("responce", user);
      if (id == user._id) {
        user.delete();
        res.status(200).json({ message: "user delete Succesfuly" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "id not matched", errors: err });
    });
};

