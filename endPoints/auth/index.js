const router = require("express").Router();
const Login = require("./Login");

// User related end points
router.post("/", Login.login);
router.post("/forgot", Login.forgotOTP);

module.exports = router;
