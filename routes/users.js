const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post("/login", users.login);
router.post("/register", users.register);

module.exports = router;