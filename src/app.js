const express = require("express");
const app = express();
const port = 3000;

// sequence of routes matter, the first route that matches will be executed. No matter how many routes match, only the first one will be executed. So, if you have a route that matches a specific path, it should be defined before a more general route.

app.get("/user", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
  res.send({ message: "User created successfully!" });
});

app.use("/test", (req, res) => {
  res.send("Hello World! This is a test route.");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
