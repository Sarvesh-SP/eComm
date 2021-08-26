const express = require("express");
const router = express.Router();

//controller
const { signup } = require("../controllers/user");
//express-validator
const { userSignupValidator, customErrors } = require("../validator");

//routes
router.post("/signup", customErrors, userSignupValidator, signup);

module.exports = router;
