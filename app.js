require("dotenv").config();

// packages
const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// controller(s)

// setup mongo connection and express
const app = express();
const { BASE_URI, PORT, MONGODB_URI } = process.env;
app.set("view engine", "ejs");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (err) => {
	console.error(err);
	console.log("Failed to connect to MongoDB. Please make sure that the MongoDB service is running.");
	process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index", { errors: {} });
});

app.listen(PORT, () => {
	console.log("Listening at ", BASE_URI, ":", PORT);
});
