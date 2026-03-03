const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, role, email) => {
  return jwt.sign(
    { id, role, email, test: "Hello !" },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      role: req.body.role === "admin" ? "user" : req.body.role,
    });
    res.status(201).json({
      message: "User created !!!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and Password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(404).json({
        message: "Email or password are incorrect !!!",
      });
    }
    const token = createToken(user._id, user.role, user.email);
    res.status(201).json({
      message: "Logged In !!!",
      data: { token, user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};
