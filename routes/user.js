const express = require("express");
const router = express.Router();

const { yo } = require("../controllers/user");

router.get("/", yo);

module.exports = router;
