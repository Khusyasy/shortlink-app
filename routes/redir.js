const express = require("express");
const router = express.Router();

const redir = require("../controllers/redir");

router.get("/:short", redir.redirToLink);

module.exports = router;