require("dotenv").config();

// packages
const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");

// controller(s)

// setup mongo connection and express
const app = express();
const { PORT, MONGODB_URI } = process.env;
app.set("view engine", "ejs");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});
mongoose.connection.on("error", (err) => {
	console.error(err);
	console.log("Failed to connect to MongoDB. Please make sure that the MongoDB service is running.");
	process.exit();
});
