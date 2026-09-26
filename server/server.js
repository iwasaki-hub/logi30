require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");

const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("💻 ", req.headers["user-agent"].split(" ")[0]);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World👋" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});
