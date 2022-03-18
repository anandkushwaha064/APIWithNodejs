const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/laxmidb",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (!error) {
      console.log("Connection Success");
    } else {
      console.log("Error Occurred while connecting to DataBase");
    }
  }
);

const User = require("./model.user.js");
const OTP = require("./model.otp");
const Pet = require("./model.pet");
