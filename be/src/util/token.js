const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "brown";

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  return decoded;
};

module.exports = { verifyToken };
