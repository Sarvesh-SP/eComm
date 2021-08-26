const express = require("express");
const router = express.Router();

//controller
const { signup, login, logout } = require("../controllers/auth");
//express-validator
const {
  userValidator,
  customErrors,
  emailCheck,
  checkSignin,
} = require("../middlewares/validator/index");

//routes
router.post("/signup", customErrors, userValidator, signup);
router.post("/login", emailCheck, userValidator, login);
router.get("/logout", logout);

module.exports = router;
