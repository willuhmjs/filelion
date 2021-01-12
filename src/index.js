// Create Express App
const express = require("express");
const app = express();

// Load modules
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Use cookieParser/bodyParser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize routes
app.use("/", require("./routes/main"));
app.use("/files", require("./routes/files"));

// Load config
const config = require("./config");

// Register extension
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// Configure views folder
app.set('views', `${__dirname}/views`);

// Configure static file folder
app.use(express.static(`${__dirname}/public`));

// Configure file uploader
app.use(fileUpload({}));

// Start the server
app.listen(config.port);
