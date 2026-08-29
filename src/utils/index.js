const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName || !emailId || !password) {
    return { valid: false, message: "Missing required fields" };
  } else if (!validator.isEmail(emailId)) {
    return { valid: false, message: "Invalid email address" };
  } else if (!validator.isStrongPassword(password)) {
    return { valid: false, message: "Invalid password" };
  }
};

module.exports = { validateSignUpData };
