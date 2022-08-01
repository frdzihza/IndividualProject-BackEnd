require("../../../config/database.js");
const express = require("express");
const router = express.Router();
const { isFieldEmpties } = require("../../../helpers");
const { hash} = require("../../../lib/bcryptjs");
const { createToken } = require("../../../lib/token");
const { sendMail } = require("../../../lib/nodemailer");
const User = require("../../../models/user.js");
const validator = require("validator");

const registerUserController = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body;

    const emptyFields = isFieldEmpties({ username, email, password, fullName });
    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Please enter correctly your :  ${emptyFields}`,
        data: { result: emptyFields },
      };
    }
    if (!validator.isAlphanumeric(username)) {
      throw {
        code: 400,
        message: "Username may only have letters and numbers.",
      };
    }
    if (!validator.isEmail(email)) {
      throw {
        code: 400,
        message: "Enter a valid email address.",
      };
    }
    if (!validator.isByteLength(password, 6, 10)) {
      throw {
        code: 400,
        message: "Password should be at least six until ten characters",
      };
    }
    
    const checkUser = await User.findOne({email})
    if(checkUser){
      if(checkUser.username == username){
        throw{
          code: 400,
          message: "Username already exist"
        }
      } else {
        throw{
          code: 400,
          message: "Email already exist"
        }
      }
    }
  const encryptedPassword = hash(password)

  const newUser = new User({
    username: username,
    email: email,
    password: encryptedPassword,
    fullName: fullName
  })

  const user = await newUser.save()

    const token = createToken({ userId: user._Id });

    await sendMail({ email, token });
  
  res.send({
      status: "Success",
      message: "Success create new user",
      data:{
        result: user,
      }
    });
} catch (error) {
    next(error);
  }
}
router.post("/", registerUserController);

module.exports = router;