const { Router } = require("express");
const app = Router();
module.exports = app;

const {pin, dir} = require("../config.js");
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


app.get("/", (req, res) => { // /files/
  checkIfAuthorized(req, res);
  let files = fs.readdirSync(dir);
  res.render("files", {files})
})

app.get("/manage/:file", async (req, res) => {
  checkIfAuthorized(req, res);
  const {file} = req.params
  console.log(`${dir}\\${file}`)
  let fileExists = fs.existsSync(`${dir}\\${req.params.file}`);
  if (!fileExists) return res.redirect("/files");
  res.render("manage.ejs", {file})
})
