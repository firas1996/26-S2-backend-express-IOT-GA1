const { signUp } = require("../controllers/authController");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/signUp", signUp);

router.route("/").post(createUser).get(getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
