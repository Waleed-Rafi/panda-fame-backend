const mongoose = require("mongoose");

const connectDB = () => {
  const url = process.env.MONGODB_URL || "mongodb://localhost:27017"; // Replace with your MongoDB server URL
  const dbName = "PandaFame"; // Replace with your database name
  return mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
