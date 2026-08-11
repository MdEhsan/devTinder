const express = require("express");
const app = express();
const port = 3000;

app.use("/test", (req, res) => {
  res.send("Hello World! This is a test route.");
});

app.use("/", (req, res) => {
  res.send("Hello World! This is the default route.");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
