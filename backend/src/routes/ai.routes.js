const express = require("express");
const getReview = require("../controller/ai.controller");
const router = express.Router();

router.get("/get-response", getReview);

module.exports = router;
