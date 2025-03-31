require("dotenv").config();

const jwt = require("jsonwebtoken");

const JWT_USER_PASSWORD = process.env.JWT_USER;

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    req.username = decoded.username;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "You are not signed in",
      error: error,
    });
  }
}

module.exports = userMiddleware;
