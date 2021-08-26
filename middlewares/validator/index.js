const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

exports.userValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.customErrors = [
  check("name", "Name is required").notEmpty(),

  check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    }),

  check("password", "Password is required")
    .notEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number."),
  check("email").custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) return Promise.reject("E-mail already in use.");
    });
  }),
  check("name").custom((value) => {
    return User.findOne({ name: value }).then((user) => {
      if (user) return Promise.reject("Name already exists");
    });
  }),
];

exports.emailCheck = [
  check("email").custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (!user) return Promise.reject("E-mail Does not exist");
    });
  }),
];
