exports.protectorMW = async (req, res, next) => {
  try {
    // 1) bech nthabtou si el user connecter or not / 3andou token or not !
    // 2) nthabtou si el token valid or not !
    // 3) nthabtou si el user moula el token mizel mawjoud walé !
    // 4) nthabtou si el token tsan3et ba3d e5er pass update or not !
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};
