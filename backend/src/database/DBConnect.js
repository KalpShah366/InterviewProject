require("dotenv").config();
const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

module.exports = DBConnect;
