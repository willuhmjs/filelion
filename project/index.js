// Create Express App
const express = require("express");
const app = express();

// Load modules
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Use CookieParser/bodyParser
app.use(cookieParser());
app.use(bodyParser());

app.use("/", require("./routes/main.js"));
app.use("/files", require("./routes/files.js"));

// Load Config
const config = require("./config");

// Register Extension
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// Register folder
app.set('views', `${__dirname}/views`);

// Serve Static Files
app.use(express.static(`${__dirname}/public`));

// Listen on port 8080
app.listen(8080);
