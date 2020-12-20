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
	const perPage = 20;
	const limit = parseInt(req.query.limit) || 20;
	const page = parseInt(req.query.page) || 1;
//	const message = res.query.message;
	try {
		const games = await Game.find({}).skip((perPage * page) - perPage).limit(limit);
		const count = await Game.find({}).count();
		const numberOfPages = Math.ceil(count / perPage);
		
		res.render("browse.ejs", {
			games: games,
			numberOfPages: numberOfPages,
			currentPage: page,
//			message: message
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

