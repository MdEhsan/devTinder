const adminAuth = (req, res) => {
  const token = "XYZ";
  const isAuthorized = token === "XYZ";
  if (isAuthorized) {
    res.send({ message: "All users fetched successfully!" });
  } else {
    res.status(401).send({ message: "Unauthorized access!" });
  }
};

module.exports = { adminAuth };
