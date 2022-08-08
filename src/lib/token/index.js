const jwt = require("jsonwebtoken");
const SECRET_WORD = "Faridz_Ihza";

const createToken = (payload) => jwt.sign(payload, SECRET_WORD);
const verifyToken = (token) => jwt.verify(token, SECRET_WORD);

module.exports = { createToken, verifyToken };