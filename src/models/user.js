const mongoose = require("mongoose");
const validator = require("validator");

const usreSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        const validGenders = ["male", "female", "other"];
        if (!validGenders.includes(value.toLowerCase())) {
          throw new Error("Invalid gender value");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "Hey there! I'm using DevTinder.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

// const User = mongoose.model("User", usreSchema);

// module.exports = User; in both way we can export the model

module.exports = mongoose.model("User", usreSchema);
