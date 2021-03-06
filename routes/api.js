const express = require("express");
const router = express.Router();

const api = require("../controllers/api");

router.get("/getLinks", api.getLinks);
router.post("/insertLink", api.insertLink);
router.post("/getLink", api.getLink);

module.exports = router;