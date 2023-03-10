const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const postValidators = [
  body("title", "Title cannot be empty!").isLength({ min: 1 }),
  body("content", "Content cannot be empty").isLength({ min: 1 }),
];

const requireLogin = passport.authenticate("jwt", { session: false });

exports.index = (req, res, next) => {
  if (!req.query.published) {
    requireLogin(req, res, () => {});
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
  }
  Post.find({ ...req.query })
    .populate("comments")
    .exec((err, posts) => {
      if (err) {
        next(err);
      }
      res.json({ posts });
    });
};

exports.show = [
  requireLogin,
  (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json({ post });
      }
    });
  },
];

exports.create = [
  postValidators,
  requireLogin,
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
  body("title", "Title cannot be empty!")
    .optional({ nullable: true })
    .isLength({ min: 1 }),
  body("content", "Content cannot be empty")
    .optional({ nullable: true })
    .isLength({ min: 1 }),
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

exports.delete = [
  requireLogin,
  (req, res, next) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res
          .status(400)
          .json({ errors: [{ msg: "ID probably doesn't exist" }] });
      } else {
        res.sendStatus(200);
      }
    });
  },
];

exports.createComment = [
  body("message", "Message should not be empty.").isLength({ min: 1 }),
  body("name", "Name should not be empty.").isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
      return;
    }
    Post.findById(req.params.id, (err, foundPost) => {
      if (err || !foundPost) {
        res
          .status(400)
          .json({ errors: [{ msg: "ID probably doesn't exist" }] });
        return;
      }
      new Comment(req.body).save((err, comment) => {
        if (err) {
          next(err);
        } else {
          Post.findByIdAndUpdate(foundPost._id, {
            $push: { comments: comment._id },
          }).then(() => res.sendStatus(200));
        }
      });
    });
  },
];
