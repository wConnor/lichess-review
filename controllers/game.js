const Game = require("../models/Game.js");
const bodyParser = require("body-parser");

exports.createIndex = async (req, res) => {
	try {
		const totalGames = await Game.countDocuments({});

		res.render("index.ejs", {
			totalGames: totalGames
		});
	} catch (err) {
		console.log(err);
		res.status(404).send({ message: "Failed to render page." });
	}
};

exports.createBrowse = async (req, res) => {

	try {
		res.render("browse.ejs", {
			
		});
	} catch (err) {
		console.log(err);
	}

};

exports.createStats = async (req, res) => {

	try {
		res.render("stats.ejs", {
			
		});
	} catch (err) {
		console.log(err);
	}

};

exports.createAbout = async (req, res) => {

	try {
		res.render("about.ejs", {
			
		});
	} catch (err) {
		console.log(err);
	}

};

