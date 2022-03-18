const mongoose = require("mongoose");

var PetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: "Required",
    unique:true
  },
  category: {
    id:{
      type: Number,
      required: [true, 'Category id should not be missing or null'],
    },
    name : {
      type: String,
      required: [true, 'Category name should not be missing or null'],
    }
  },
  name: {
    type: String,
    required: [true, 'Pet Name cannot be missing or null'],
  },
  photoUrls: [
    {
    type: String,
    required: "Required",
    }
  ],
  tags: [{
    id: {
        type:Number,
        required: [true, 'Tag id should not be missing or null'],
    },
    name : {
        type: String,
        required: [true, 'Tag name should not be missing or null'],
    }
  }],
  status: {
    type: String,
    required: [true, 'status should not be missing or null'],
    enum: ['Not available', 'available'],
    default: "Not available"
  }
});

mongoose.model("Pet", PetSchema);
