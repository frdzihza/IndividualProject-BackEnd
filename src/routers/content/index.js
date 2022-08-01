const express = require("express");
const router = express.Router();

const postUserContent = require("./post");



router.use(postUserContent);

module.exports = router;