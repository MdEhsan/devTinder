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

const validateProfileEditData = (req) => {
  const fieldsToBeEdited = [
    "firstName",
    "lastName",
    "emailId",
    "password",
    "gender",
    "age",
    "about",
    "skills",
    "photoUrl",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    fieldsToBeEdited.includes(field),
  );

  return isAllowed;
};

module.exports = { validateSignUpData, validateProfileEditData };
