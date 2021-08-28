const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id, (err, docs) => {
    if (err || !docs)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = docs;
    next();
  });
};
