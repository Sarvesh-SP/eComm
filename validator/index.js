const { body, validationResult } = require("express-validator");

exports.userSignupValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors) {
    const first = errors.array().map((error) => error.msg);

    return res.status(400).json({ error: first });
  }
  next();
};

exports.customErrors = [
  body("name", "Name is required").notEmpty(),

  body("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    }),

  body("password", "Password is required")
    .notEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number."),
];
