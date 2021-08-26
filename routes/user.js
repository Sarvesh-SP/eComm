const express = require("express");
const router = express.Router();

//controller for user
const { userById } = require("../controllers/user");

//controller for auth
const { checkSignin, isAuth, isAdmin } = require("../controllers/auth");

//routes

router.get("/secret/:userId", checkSignin, isAuth, isAdmin, (req, res) => {
  res.json(req.profile);
});

router.param("userId", userById);

module.exports = router;
