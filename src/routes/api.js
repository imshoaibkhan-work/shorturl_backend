const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlcontroller");

// POST /api/url/shorten
router.post("/url/shorten", urlController.shortenUrl);
router.get("/:shortURL", urlController.getShortenUrl);

module.exports = router;
