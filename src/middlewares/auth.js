const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // Get the token from the cookie
  const { token } = req.cookies;

  // If the token is not present, return an error
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!!!!" });
  }

  try {
    // Verify the token
    const decoded = await jwt.verify(token, "Tinder@12345");
    const { userId } = decoded;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!!!" });
    }

    req.user = user;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error verifying token", error: err.message });
  }
};

module.exports = { userAuth };
