const express = require("express");
const router = express.Router();

const getVerify = require("./verifyUser");
const postUserRegisterRouter = require("./register");
const postUserLoginRouter = require("./login");
const getUserProfile = require("./profile")


router.use(getUserProfile);
router.use(postUserRegisterRouter);
router.use(postUserLoginRouter);
router.use(getVerify)


module.exports = router;