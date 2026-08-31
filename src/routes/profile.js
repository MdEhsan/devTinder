const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Profile fetched successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching profile", error: err.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  if (!validateProfileEditData) {
    res.status(400).json({ message: "Invalid Filed" });
  }

  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  await loggedInUser.save();
  res
    .status(201)
    .json({ message: "User updated successfully", data: loggedInUser });
});

module.exports = profileRouter;
