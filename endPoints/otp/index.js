const router = require("express").Router();
const OTP = require('./OTP');

// User related end points
router.post('/', OTP.getOTP);
router.post('/', OTP.verifyOTP);
module.exports = router;