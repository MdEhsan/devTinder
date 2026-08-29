const express = require("express");
const { userAuth } = require("../middlewares/auth");

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

module.exports = profileRouter;
