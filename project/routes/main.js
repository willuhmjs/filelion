const { Router } = require("express");
const app = Router();
module.exports = app;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  let {auth} = req.cookies;
  if (auth) return res.redirect("/files");
  res.render("signin");
})
