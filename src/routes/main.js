const { Router } = require("express");
const app = Router();
module.exports = app;

const { password } = require("../config.js");
const md5 = require("md5");

const passMD5 = md5(password);

app.get("/", (req, res) => {
    const { auth } = req.cookies;
    const path = auth ? "/signin" : "/files";
    res.redirect(path);
});

app.get("/signin", (req, res) => {
    const { auth } = req.cookies;
    if (auth) {
        return res.redirect("/files");
    }

    res.render("signin");
});

app.post("/signin", (req, res) => {
    const { auth } = req.cookies;
    if (auth) {
        return res.redirect("/files");
    }

    const { password: p } = req.body;
    if (p !== password) {
        // todo create error message
        return res.redirect("/signin");
    }

    res.cookie("auth", passMD5);
    res.redirect("/files");
});

app.get("/signout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/signin");
});
