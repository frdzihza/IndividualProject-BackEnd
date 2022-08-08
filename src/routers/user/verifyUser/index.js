const express = require("express");
const router = express.Router();
// const { auth } = require("../../../helpers/auth");
const { verifyToken } = require("../../../lib/token");
const User = require("../../../models/user.js");


const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

const getUserToken = await User.findOne({ userToken: token });

if (!getUserToken)
  return res.send("<h2>your code has expired, please use the new code</h2>");

    
    const verified = verifyToken(token);
    

    const verifiedUser = await User.findByIdAndUpdate(
       verified.userId,
      { isVerified: true },
      {
        new: true,
      }
    );

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