const { verify } = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech nthabtou si el user connecter or not / 3andou token or not !
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) nthabtou si el token valid or not !
    const verified = await promisify(verify)(token, process.env.JWT_SECRET);
    // console.log(verified);
    // 3) nthabtou si el user moula el token mizel mawjoud walé !
    const user = await User.findById(verified.id);
    // console.log(verified.id);
    if (!user) {
      return res.status(401).json({
        message: "This user is no longer exists !!!",
      });
    }
    // 4) nthabtou si el token tsan3et ba3d e5er pass update or not !
    // console.log(parseInt(user.last_password_change_date.getTime() / 1000));
    // console.log(verified.iat);
    if (
      parseInt(user.last_password_change_date.getTime() / 1000) > verified.iat
    ) {
      return res.status(401).json({
        message: "You must re-loggin !!!",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};
