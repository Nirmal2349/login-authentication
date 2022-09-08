const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: [true, "Please Enter Email Address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
  },
  phoneNumber: String,
  firstname: String,
  lastname: String,
});

module.exports = mongoose.model("User", UserSchema);
