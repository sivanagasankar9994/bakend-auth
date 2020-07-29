// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   //   //get the token from the header if present
//   //   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   //   //if no token found, return response (without going to the next middelware)
//   //   if (!token) return res.status(401).send("Access denied. No token provided.");

//   //   try {
//   //     //if can verify the token, set req.user and pass to next middleware
//   //     const data = jwt.verify(token, process.env.JWT_SECRET);
//   //     console.log("sdsfg", data);
//   //     // req.user = decoded;
//   //     next();
//   //   } catch (ex) {
//   //     //if invalid token
//   //     res.status(400).send("Invalid token.");
//   //   }
//   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   console.log("token", token);
// //   if (!token) return res.status(401).send("Access denied. No token provided.");

// //   try{
// //       console.log("Hello",process.env.JWT_SECRET)
// //       const decoded = jwt.verify(token,process.env.JWT_SECRET );
// //       console.log("decode info",decoded)

// //   }
// //   catch{
// //     //if invalid token
// //     // res.status(400).send("Invalid token.");
// //     console.log("Token chekc")
// //   }

// //   jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
// //     if (err) {
// //       res.status(400).send("You are not authenticated");
// //     } else {
// //       if (decoded) {
// //         console.log("decode data", decode);
// //       } else {
// //         res
// //           .status(401)
// //           .send("You are not authorized to perform this operation!");
// //       }
// //     }
// //   });
// };

const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

module.exports = function (req, res, next) {
    const token = req.header("Authorization").replace("Bearer", "").trim();

    const token = req.headers["x-access-token"] || req.headers["authorization"];
  //   const token = req.headers["x-access-token"] || req.headers["authorization"];
  // const token = req.header("Authorization").replace("Bearer ", "")||req.header("token");
  // const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "secret");
    const user = User.findOne({ _id: decoded._id, loginToken: token });
    console.log("Decode", user._conditions._id);
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
