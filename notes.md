const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const app = express();
const port = 3000;

// sequence of routes matter, the first route that matches will be executed. No matter how many routes match, only the first one will be executed. So, if you have a route that matches a specific path, it should be defined before a more general route.

// routes will work with the regular expression like if put ? after a character, it will make that character optional. For example, /user? will match both /user and /users. If you put + after a character, it will match one or more occurrences of that character. For example, /user+ will match /user, /users, /userr, etc. If you put _ after a character, it will match zero or more occurrences of that character. For example, /user_ will match /user, /users, /userr, /userrr, etc. If you put + after a character, it will match one or more occurrences of that character. For example, /user+ will match /user, /users, /userr, etc. If you put _ after a character, it will match zero or more occurrences of that character. For example, /user_ will match /user, /users, /userr, /userrr, etc. If you put () around a group of characters, it will create a capturing group. For example, /(user)+ will match /user, /users, /userr, etc. and will capture the matched group. If you put | between two groups of characters, it will create an alternation. For example, /(user|admin) will match /user and /admin.

//req.param is used to get the route parameters example with path we pass as :userId and req.query is used to get the query parameters for example we pass as ?name=John&age=30.

app.get("/user/:userId/:lastName", (req, res) => {
// console.log(req.query);
// console.log(req.params);
res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
res.send({ message: "User created successfully!" });
});

app.use("/test", (req, res) => {
res.send("Hello World! This is a test route.");
});

// example of the mulitple controllers for the same route. and router handle can be passed

// app.get(
// "/testController",
// (req, res, next) => {
// console.log("First controller executed");
// next();
// // res.send("First controller executed");
// },
// (req, res, next) => {
// console.log("Second controller executed");
// // res.send("Second controller executed");
// next();
// },
// (req, res, next) => {
// console.log("Third controller executed");
// // res.send("Third controller executed");
// next();
// },
// (req, res) => {
// console.log("Fourth controller executed");
// res.send("Fourth controller executed");
// },
// );

// app.get("/admin/getAllUsers", adminAuth);

// app.get("/admin/deleteUser", (req, res) => {
// res.send({ message: "User deleted successfully!" });
// });

app.use("/", (err, req, res, next) => {
if (err) {
res.status(500).send({ message: "Something went wrong!" });
}
});

app.get("/getUserData", (req, res, next) => {
try {
// Simulating an error
throw new Error("Something went wrong!");
} catch (error) {
res
.status(500)
.send({ message: "Something went wrong! Contact support team" });
}
});

app.listen(port, () => {
console.log(`Server is running on ${port}`);
});
