const express = require("express");
const router = express.Router();

const commentPostUserContent = require("./comment");

router.use(commentPostUserContent);

module.exports = router
