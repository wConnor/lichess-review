require("dotenv").config();

// packages
const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const Game = require("./models/Game.js");

// controller(s)
const gameController = require("./controllers/game.js");

// setup express and .env
const app = express();
const { BASE_URI, PORT, MONGODB_URI } = process.env;
app.set("view engine", "ejs");

// connect to mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (err) => {
	console.error(err);
	console.log("Failed to connect to MongoDB. Please make sure that the MongoDB service is running.");
	process.exit();
});

app.get("/", gameController.createIndex);

app.get("/browse", gameController.createBrowse);

app.get("/stats", gameController.createStats);

app.get("/about", gameController.createAbout);

app.listen(PORT, () => {
	console.log("Listening at ", BASE_URI, ":", PORT);
});
