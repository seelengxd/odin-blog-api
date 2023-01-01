const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.login = [
  body("username", "Username should not be empty").isLength({ min: 1 }),
  body("password", "Password should not be empty").isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }
    User.findOne(req.body, (err, found_user) => {
      if (err) {
        return next(err);
      }
      if (!found_user) {
        res.sendStatus(401);
        return;
      }
      jwt.sign({ found_user }, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          return next(err);
        }
        res
          .cookie("jwt", token, { httpOnly: true, secure: false })
          .sendStatus(200);
      });
    });
  },
];
