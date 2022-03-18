const router = require("express").Router();
const User = require("./User");
const auth = require("../auth/jwt-token").verifyToken;

// User related end points
router.post("/", User.createUser);
router.get("/", auth, User.getUser);
router.get("/all", auth, User.getUser);
router.get("/desable/:id", auth, User.desableUser);
router.get("/enable/:id", auth, User.enableUser);
router.delete("/:id", auth, User.deleteUser);

module.exports = router;
