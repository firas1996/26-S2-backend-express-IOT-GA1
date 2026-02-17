const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.patch("/updateUserById/:id", updateUserById);

module.exports = router;
