const express = require("express");
const router = express.Router();

const postRouter = require("./posts");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
