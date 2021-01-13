const { Router } = require("express");
const app = Router();
module.exports = app;

const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const { password, storage } = require("../config.js");
const passMD5 = md5(password);

// Use fileupload
const fileUpload = require("express-fileupload");
app.use(fileUpload({}));

function isAuthorized(req, res) {
    const { auth } = req.cookies;
    if (!auth) {
        res.redirect("/signin");
        return false;
    }
    if (passMD5 !== auth) {
        res.redirect("/signout");
        return false;
    }
    return true;
}

function fileExists(req, res) {
    const { file } = req.params;
    if (!fs.existsSync(path.join(storage, file))) {
        res.redirect("/files");
        return false;
    }
    return true;
}

app.get("/", (req, res) => {
    if (!isAuthorized(req, res)) return;

    const files = fs.readdirSync(storage);
    res.render("files", { files });
});

app.get("/manage/:file", (req, res) => {
    if (!isAuthorized(req, res)) return;
    if (!fileExists(req, res)) return;

    const { file } = req.params;
    res.render("manage", { file });
});

app.get("/view/:file", (req, res) => {
    if (!isAuthorized(req, res)) return;
    if (!fileExists(req, res)) return;

    const { file } = req.params;
    res.sendFile(path.join(storage, file));
});

app.get("/delete/:file", (req, res) => {
    if (!isAuthorized(req, res)) return;
    if (!fileExists(req, res)) return;

    const { file } = req.params;
    fs.unlinkSync(path.join(storage, file));
    res.redirect("/files");
});

app.post("/upload", async (req, res) => {
    if (!isAuthorized(req, res)) return;

    const { file } = req.files;
    await file.mv(path.join(storage, file.name));
    res.redirect("/files");
});
