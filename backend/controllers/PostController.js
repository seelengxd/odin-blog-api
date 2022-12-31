const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

const postValidators = [
  body("title", "Title cannot be empty!").isLength({ min: 1 }),
  body("content", "Content cannot be empty").isLength({ min: 1 }),
];

exports.index = (req, res, next) => {
  Post.find({ ...req.query }, (err, posts) => {
    if (err) {
      next(err);
    }
    res.json({ posts });
  });
};

exports.create = [
  postValidators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      new Post(req.body).save((err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  },
];

exports.update = [
  postValidators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      Post.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
          res
            .status(400)
            .json({ errors: [{ msg: "ID probably doesn't exist" }] });
        } else {
          res.sendStatus(200);
        }
      });
    }
  },
];

exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(400).json({ errors: [{ msg: "ID probably doesn't exist" }] });
    } else {
      res.sendStatus(200);
    }
  });
};

exports.createComment = (req, res, next) => {
  res.json({ message: "Create comment: not implemented" });
};
