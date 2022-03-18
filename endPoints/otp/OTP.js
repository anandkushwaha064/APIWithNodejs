const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const OTP = mongoose.model("OTP");
const Message = require("../message");
require("../../dbmodel/index");

exports.getOTP = async (request, response) => {
  try {
    const responsebody = request.body;
    const newOTP = new OTP();
    newOTP.otp = Math.random() * (999999 - 100000) + 100000;
    newOTP.timeDuration = 10;
    newOTP.MobileNumber = responsebody.MobileNumber;
    newOTP.DateTime = Date.now();
    newOTP.ObjectDetails = responsebody;
    newOTP.save();
    Message.sendMessage(newOTP.MobileNumber, newOTP.otp);
    response.status(201).json({ SessionId: newOTP.id, OTP: newOTP.otp });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Error Occured while Creating User" });
  }
};

exports.verifyOTP = async (request, response) => {
  try {
    const body = request.body;
    const data = await OTP.findOne({
      _id: body.SessionId,
      otp: body.OTP_value,
    });
    return data;
  } catch (err) {
    response.status(500).send({ error: "Error Occured while verifying OTP" });
    console.log(err);
  }
};

exports.delete = async (SessionId) => {
  await OTP.deleteOne({ _id: SessionId });
};
