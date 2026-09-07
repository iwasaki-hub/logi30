const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello Express Server 👋" });
});

app.listen(PORT, () => {
  console.log(`🚀 The server is running on port ${PORT}`);
});
