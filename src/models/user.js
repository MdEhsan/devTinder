const mongoose = require("mongoose");

const usreSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// const User = mongoose.model("User", usreSchema);

// module.exports = User; in both way we can export the model

module.exports = mongoose.model("User", usreSchema);
