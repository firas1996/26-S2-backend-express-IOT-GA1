const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);

module.exports = router;
