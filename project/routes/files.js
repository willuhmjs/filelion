const { Router } = require("express");
const app = Router();
module.exports = app;

const {pin, dir, sep} = require("../config.js");
const md5 = require("md5");
const fs = require("fs");

/*
-- Planned Endpoints --
/files/
/files/manage/:file
/files/view/:file
/files/delete/:file
*/

function checkIfAuthorized(req, res) {
  let {auth} = req.cookies;
  if (!auth) return res.redirect("/signin");
  let pinHashed = md5(pin);
  if (pinHashed !== auth) return res.redirect("/signout");
}

function fileExists(req, res) {
  let {file} = req.params
  if (!fs.existsSync(dir+sep+file)) return res.redirect("/files");
}

app.get("/", (req, res) => { // /files/
  checkIfAuthorized(req, res);
  let files = fs.readdirSync(dir);
  res.render("files", {files})
})

app.get("/manage/:file", (req, res) => {
  checkIfAuthorized(req, res);
  fileExists(req, res);
  let {file} = req.params
  res.render("manage.ejs", {file})
})

app.get("/view/:file", (req, res) => {
  checkIfAuthorized(req, res);
  fileExists(req, res);
  res.sendFile(dir+sep+req.params.file);
})

app.get("/delete/:file", (req, res) => {
  checkIfAuthorized(req, res);
  fileExists(req, res);
  fs.unlinkSync(dir+sep+req.params.file);
  res.redirect("/files");
})
