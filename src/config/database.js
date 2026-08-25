const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://md_ehsan:Ehsan%401995@namastenode.jmiqbgb.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(dbUrl);
};

module.exports = connectDB;
