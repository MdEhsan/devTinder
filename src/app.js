const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/index");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate the signup data using the utility function
    validateSignUpData(req);

    //encrypt the password before saving it to the database
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    // create a new user instance and save it to the database
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating userrrrrr", error: err });
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPassworMatch(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = user.getJWTToken();
    res.cookie("token", token, {
      maxAge: 8 * 3600000,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Profile fetched successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching profile", error: err.message });
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
