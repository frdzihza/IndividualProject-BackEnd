const express = require("express");
const router = express.Router();
// const { auth } = require("../../../helpers/auth");
const { verifyToken } = require("../../../lib/token");
const User = require("../../../models/user.js");


const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    const verifiedToken = verifyToken(token);

    const verifiedUser = await User.findOneAndUpdate(verifiedToken.userId,
      {isVerified: true}
    )

    if (!verifiedUser){
      throw { message: "Verification failed" };
    } else{
      res.send("<h1>Verification Success</h1>");
    }

  } catch (error) {
    next(error)
  }
};

router.get("/verification/:token", verifyUserController);

module.exports = router;