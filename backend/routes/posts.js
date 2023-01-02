const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.get("/", PostController.index);

router.post("/", PostController.create);

router.get("/:id", PostController.show);

router.put("/:id", PostController.update);

router.delete("/:id", PostController.delete);

router.post("/:id/comments", PostController.createComment);

module.exports = router;
