const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup Route
exports.signup = async (req, res) => {
  // console.log("req.body", req.body);
  const { name, email, password, about } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await new User({
    name: name,
    email: email,
    hash_password: hash,
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Something went wrong while adding your data",
      });
    }
    res.json({
      user,
    });
  });
};

//Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const desc = await user.authenticate(password, user.hash_password);
  if (user && desc) {
    const token = jwt.sign({ id: user._id }, process.env.TOKEN);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.send({ token, user: { _id, email, name, role } });
  } else {
    return res.status(401).json({
      error: "Email and password don't match",
    });
  }
};

//Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successful" });
};
