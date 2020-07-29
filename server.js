const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = 6000;
let connection = require("./dbConnection");

const bodyParser = require("body-parser");
const taskRoute = require("./controllers/routes/taskRoutes");
const personRoute = require("./controllers/routes/relationRoutes");
// const cors = require("cors");
// app.use(cors());
app.use(bodyParser.json());

// 3) ROUTES
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/person", personRoute);
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
