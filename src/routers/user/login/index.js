const express = require("express");
const router = express.Router();
const { compare } = require("../../../lib/bcryptjs");
const { createToken } = require("../../../lib/token");
const User = require("../../../models/user.js");

const loginUserController = async (req, res, next) => {
  try {
    const { username, password} = req.body;
    // console.log(isVerified)

    const userUsername = await User.findOne({$or: [{username: username}, {email: username}]})
    // console.log(userUsername)

    if (!userUsername) {
      throw {
        code: 404,
        message: `Can not find account with this username or email`,
      };
    }
    
    // if(!userUsername.isVerified){
    //   throw{
    //     message: "You need to verify first"
    //   }
    // }

    const isPasswordMatch = compare(password, userUsername.password);

    if (!isPasswordMatch) {
      throw {
        code: 401,
        message: `Password is incorrect`,
      };
    }


    const token = createToken({
      userId: userUsername._id,
      username: userUsername.username,
    });

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        result: {
          userId: userUsername._id,
          username: userUsername.username,
          accessToken: token,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
router.post("/login", loginUserController);

module.exports = router;