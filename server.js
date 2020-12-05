const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json("Hello, GeeksforGeeks!");
});

app.listen(port, () => {
  console.log(`Server started in port ${port}.`);
});
