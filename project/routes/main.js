const { Router } = require("express");
const app = Router();
module.exports = app;

const {pin} = require("../config.js");
const md5 = require("md5");

app.get("/", (req, res) => {
  res.redirect("/signin");
});

app.get("/signin", (req, res) => {
  let {auth} = req.cookies;
  if (auth) return res.redirect("/files");
  res.render("signin");
})

app.post("/signin", (req, res) => {
  let {auth} = req.cookies;
  let {attemptedPin} = req.body;
  if (auth) return res.redirect("/files");
  if (!attemptedPin) return res.redirect("/signin"); // todo create error message
  if (attemptedPin !== pin) return res.redirect("/signin"); // todo create error message
  res.cookie("auth", md5(pin));
  return res.redirect("/files");
})

app.get("/signout", (req, res) => {
  let {auth} = req.cookies;
  if (!auth) return res.redirect("/signin");
  res.clearCookie('auth');
  res.redirect("/signin");
})
