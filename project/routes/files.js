const { Router } = require("express");
const app = Router();
module.exports = app;

const {pin} = require("../config.js");
const md5 = require("md5");

function checkIfAuthorized(req, res) {
  let {auth} = req.cookies;
  if (!auth) return res.redirect("/signin");
  let pinHashed = md5(pin);
  if (pinHashed !== auth) return res.redirect("/signout");
}

app.get("/", (req, res) => { // /files/
  checkIfAuthorized(req, res);
  // todo do stuff
})
