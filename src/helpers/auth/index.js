// require("../../../config/database.js");
const { verifyToken } = require("../../lib/token");
// const User = require("../../models/user.js");

const auth = async (req, res, next) => {
  try {
    const token = req.token;
    if(!token){
      throw new Error("failed")
    }
    const verifiedToken = verifyToken(token);
    req.user ={
      userId: verifiedToken.userId,
    username: verifiedToken.username}
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
