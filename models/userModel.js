const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your Name !"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter Your Name !"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter Your Password !"],
    trim: true,

  },
  role: {
    type: Number,
   default: 0, // 0 = user , 1 = admin
  },
  avatar:{
      type: String,
      default: "https://res.cloudinary.com/fpt-greenwich-vietnam-da-nang/image/upload/v1641319264/avatar/avatar_fco8ch.jpg"
  }
},{ 
    timestamp: true,
});

module.exports = mongoose.model("User", userSchema);
