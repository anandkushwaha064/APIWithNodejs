const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const OTP = require("../otp/OTP");
const Token = require("../auth/jwt-token");

exports.createUser = async (request, response) => {
  const body = request.body;
  if (body.Stage == 1) {
    const Userinfo = await UserModel.findOne({
      Userid: body.Userid,
    });
    if (!Userinfo) {
      OTP.getOTP(request, response);
    } else {
      response.status(201).json({ Error: "UserId already exist" });
    }
  } else if (body.Stage == 2) {
    var data = await OTP.verifyOTP(request, response);
    if (!data) {
      response.status(500).json({ error: "Invalid OTP verification" });
    } else {
      data = data.ObjectDetails;
      insertUser(data);
      await OTP.delete(body.SessionId);
      const Userinfo = await UserModel.findOne({
        Userid: data.Userid,
      });
      const responseBody = {
        IsUserCreated: "Yes",
        token: Token.token(Userinfo.Userid, Userinfo.AccountId),
        UserInfo: Userinfo,
      };
      response.status(201).json(responseBody);
    }
  } else {
    const responseBody = {
      IsUserCreated: "No",
      Error: "Invalid Stage",
    };
    response.status(400).json(responseBody);
  }
};

insertUser = async (body) => {
  console.log("Creating user ");
  const newUser = new UserModel();
  newUser.AccountId = body.AccountId;
  newUser.Userid = body.Userid;
  newUser.Password = body.Password;
  newUser.Name = body.Name;
  newUser.MobileNumber = body.MobileNumber;
  newUser.EmailId = body.EmailId;
  newUser.UserCreate = body.UserCreate;
  newUser.AuthroizationLevel = body.AuthroizationLevel;
  newUser.DateTime = Date.now();
  newUser.Enabled = true;
  newUser.ParentUser = "Enterprise";
  newUser.save();
};

exports.getUser = async (request, response) => {
  UserModel.findOne((error, document) => {
    if (error)
      response
        .status(500)
        .send({ error: "Error Occured while reading User List" });
    if (document) {
      response.json(document);
    }
  });
};

exports.getUserInfo = async (Userid) => {
  return await UserModel.findOne({
    Userid: Userid,
  });
};

exports.deleteUser = async (request, response) => {
  UserModel.find((error, document) => {
    if (!error) request.send("");
  });
};

exports.desableUser = async (request, response) => {
  UserModel.find((error, document) => {
    if (!error) request.send("");
  });
};

exports.enableUser = async (request, response) => {
  UserModel.find((error, document) => {
    if (!error) request.send("");
  });
};
