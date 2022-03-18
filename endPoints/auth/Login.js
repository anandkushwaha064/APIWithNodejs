const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const OTP = mongoose.model("OTP");
const Token = require("../auth/jwt-token");

exports.forgotOTP = async (request, response) => {
  UserModel.find((error, document) => {
    if (error)
      response
        .status(500)
        .send({ error: "Error Occured while reading User List" });
    if (document) {
      response.json(document);
    }
  });
};

exports.login = async (request, response) => {
  const body = request.body;
  
  try{

  Userinfo = await UserModel.findOne({
    Userid: body.Userid,
    Password: body.Password,
  });

  if (Userinfo) {
    if (Userinfo.Enabled) {
      const responseBody = {
        Message : "Login success",
        token: Token.token(Userinfo.Userid, Userinfo.AccountId)
      };
      response.status(200).json(responseBody);
    } else {
      const responseBody = {
        UserLoggedIn: "No",
        Message: "This User Account is Suspended",
      };
      response.status(400).json(responseBody);
    }
  } else {
    const responseBody = {
      UserLoggedIn: "No",
      Message: "Invalid Credential",
    };
    response.status(401).json(responseBody);
  }
}
catch(error)
{
  response.status(400).json({error: "Invalid inputs"});
}
 
};
