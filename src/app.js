const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 3000;

app.post("/signup", async (req, res) => {
  const newUser = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@example.com",
    password: "password123",
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
