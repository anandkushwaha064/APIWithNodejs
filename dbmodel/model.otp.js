const mongoose = require("mongoose");

var optSchema = new mongoose.Schema({
    otp:{
        type:String,
        required : "Required"
    }, 
    timeDuration :{
        type: Number,
        required : "Required"
    }, 
    MobileNumber:{
        type:String,
        required : "Required"
    },
    DateTime: {
        type:Date, 
        required : "Required"
    },
    ObjectDetails: {
        type:Object, 
        required : "Required"
    }
})

mongoose.model("OTP", optSchema)