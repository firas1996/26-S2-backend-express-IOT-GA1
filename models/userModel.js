const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required !!!!"],
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "The email is required !!!!"],
    unique: [true, "email exist !!!"],
    validate: [validator.isEmail, "Email is not valid !!!"],
    lowercase: true,
    // uppercase: true,
  },
  password: {
    type: String,
    required: [true, "The password is required !!!!"],
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: [true, "The password is required !!!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "password does not match !!!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  last_password_change_date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
