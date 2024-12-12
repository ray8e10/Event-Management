const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Not able to connect to MOngoDB", error);
  }
};

module.exports = connectDB;
