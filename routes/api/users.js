const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  res.json(
    users.map((u, UserID) => {
      const a = { UserID, ...u };
      delete a.Password;
      return a;
    })
  );
});
app.get("/:id", (req, res) => {
  const UserID = +req.params.id;
  if (users[UserID]) {
    const a = { UserID, ...users[UserID] };
    delete a.Password;
    res.json(a);
  } else {
    res.status(404).json("Error! User Not Found!");
  }
});

module.exports = app;
