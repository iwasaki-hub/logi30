require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.headers["user-agent"]);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Express Server 👋" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 The server is running on port ${PORT}`);
});
