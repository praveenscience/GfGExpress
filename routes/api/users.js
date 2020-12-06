const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  const { Authenticated } = req.session;
  if (Authenticated) {
    res.json(
      users.map((u, UserID) => {
        const a = { UserID, ...u };
        delete a.Password;
        return a;
      })
    );
  } else {
    res.status(403).json("Please login to see.");
  }
});
app.get("/login", (req, res) => {
  const { Authenticated } = req.session;
  res.json({ Authenticated });
});
app.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    res.status(400).json("Need both Username and Password.");
  } else {
    const matched = users.filter(
      u =>
        u.Username.toLowerCase() === Username.toLowerCase() &&
        u.Password === Password
    );
    if (matched.length === 1) {
      const user = { ...matched[0] };
      delete user.Password;
      req.session.Authenticated = user;
      res.json({ Success: true });
    } else if (matched.length === 0) {
      req.session.destroy(() => res.status(401).json("Oops! Bad credentials!"));
    }
  }
});
app.post("/logout", (req, res) => {
  res.destroy();
  res.json({ Success: true });
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
