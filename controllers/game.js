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

	try {
		const games = await Game.find({}).skip((perPage * page) - perPage).limit(limit);
		const count = await Game.find({}).count();
		const numberOfPages = Math.ceil(count / perPage);
		
		res.render("browse.ejs", {
			games: games,
			numberOfPages: numberOfPages,
			currentPage: page,
		});
	} catch (err) {
		console.log(err);
	}

};

exports.deleteGame = async (req, res) => {
	try {
		await Game.findByIdAndRemove(req.params.id);
		res.redirect("/browse");
	} catch (err) {
		
		res.status(404).send({ message: `Could not delete record ${req.params.id}.`, });
		console.log(err);
	}
};

exports.updateGame = async (req, res) => {
	// try {
	// 	const game = await Game.findById(id);
	// 	if (!game) {
	// 		throw Error("Unable to find game \'", game);
	// 	}
	// 	res.render("");
	// } catch (err) {
		
	// }

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

