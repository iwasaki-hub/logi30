const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🍃 MongoDB接続成功: ${conn.connection.name}`);
  } catch (err) {
    console.error(`❌ MongoDB接続エラー: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
