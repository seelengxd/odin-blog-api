var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);

router.get("/logout", UserController.logout);

module.exports = router;
