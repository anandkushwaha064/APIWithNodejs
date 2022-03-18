const express = require("express");
const application = express();
require("./dbmodel");
const UserEndpoint = require("./endPoints/user");
const Pet = require("./endPoints/pet");
const auth = require("./endPoints/auth/jwt-token").verifyToken;
const Login = require("./endPoints/auth");

application.use(express.json());

application.all("/", (reqest, response) => {
  response.send("Empty End Point");
});

application.use("/login", Login);
application.use("/user", UserEndpoint);
application.use("/pet", auth, Pet);

module.exports = application;
