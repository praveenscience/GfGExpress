const express = require("express");
const api = require("./api");
const app = express.Router();

app.get("/", (req, res) => {
  res.json("Welcome to GeeksforGeeks API Server!");
});
app.use("/api", api);

module.exports = app;
