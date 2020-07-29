const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence');

const mongoURI = "mongodb://localhost:27017/Auth-Authentication";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log("Error while connecting db", err);
  });
