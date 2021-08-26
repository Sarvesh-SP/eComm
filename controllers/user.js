const User = require("../models/user");
const bcrypt = require("bcrypt");

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
