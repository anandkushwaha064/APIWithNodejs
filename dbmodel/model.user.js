const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  AccountId: {
    type: String,
    required: "Required",
  },
  Userid: {
    type: String,
    required: "Required",
    createIndexes: { unique: true },
  },
  Password: {
    type: String,
    required: "Required",
  },
  Name: {
    type: String,
    required: "Required",
  },
  MobileNumber: {
    type: String,
    required: "Required",
  },
  EmailId: {
    type: String,
    validate: [isEmail, "invalid email"],
  },
  UserCreate: {
    type: String,
    required: "Required",
  },
  DateTime: {
    type: Date,
    required: "Required",
  },
  AuthroizationLevel: {
    type: Number,
    required: "Required",
  },
  Enabled: {
    type: Boolean,
    required: "Required",
  },
  ParentUser: {
    type: String,
    required: "Required",
  },
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async (data) => {
  return bcrypt.compare(data, this.password);
};

mongoose.model("User", UserSchema);
