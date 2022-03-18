const mongoose = require("mongoose");

var stockSchema = new mongoose.Schema({
  AccountId: {
    type: String,
    required: "Required",
  },
  otp: {
    type: String,
    required: "Required",
  },
  timeDuration: {
    type: Number,
    required: "Required",
  },
  MobileNumber: {
    type: String,
    required: "Required",
  },
  DateTime: {
    type: Date,
    required: "Required",
  },
  ObjectDetails: {
    type: Object,
    required: "Required",
  },
});

mongoose.model("Stock", stockSchema);
