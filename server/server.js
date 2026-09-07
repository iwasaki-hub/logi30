const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello Express Server 👋" });
});

app.listen(PORT, () => {
  console.log(`🚀 The server is running on port ${PORT}`);
});
