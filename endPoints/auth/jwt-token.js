const jwt = require("jsonwebtoken");
const User = require("../user/User");

exports.token = (userid, AccountId) => {
  const token = jwt.sign({ userid, AccountId }, process.env["secretKey"], {
    expiresIn: "2h",
  });
  return token;
};

exports.verifyToken = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).send({error:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env["secretKey"]);
    req.userDetails = decoded;
    const { Userid } = decoded;
    if (!User.getUserInfo(Userid))
      return res.status(401).send({error:"This token is expired"});
  } 
  catch (err) {
    return res.status(401).send({error:"Invalid Token"});
  }
  return next();
};
