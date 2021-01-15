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
	const perPage = 15;
	const limit = parseInt(req.query.limit) || 15;
	const page = parseInt(req.query.page) || 1;

	const games = await Game.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Game.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

	try {
		const games = await Game.find({}).skip((perPage * page) - perPage).limit(limit);
		const count = await Game.find({}).countDocuments();
		const numberOfPages = Math.ceil(count / perPage);
		const message = req.query.message;
		
		res.render("browse.ejs", {
			games: games,
			numberOfPages: numberOfPages,
			currentPage: page,
			message: message
		});
	} catch (err) {
		console.log(err);
	}

};

exports.createGame = async (req, res) => {
	try {
		const newGame = await Game.findById(req.body.game_id);
		await Game.create({
			match_id: req.body.match_id,
			rated: req.body.rated,
			turns: req.body.turns,
			victory_status: req.body.victory_status,
			winner: req.body.winner,
			white_id: req.body.white_id,
			white_rating: req.body.white_rating,
			black_id: req.body.black_id,
			black_rating: req.body.black_rating,
			moves: req.body.moves
		});
		res.redirect("/browse/?message=Created");
	} catch (err) {
		res.status(404).send({ message: `Unable to create game '${req.params.id}`});
	}
};

exports.createGameView = async (req, res) => {
	try {
		res.render("create-game");
	} catch (err) {
		res.status(404).send({ message: `Unable to create game view: '${req.params.id}`});
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

exports.editGame = async (req, res) => {
	try {
		const game = await Game.findById(req.params.id);
		res.render("update-game", { game: game, id: req.params.id });
	} catch (err) {
		res.status(404).send({ message: `Unable to find game '${req.params.id}`});
	}
};

exports.updateGame = async (req, res) => {
	try {
		const game = await Game.updateOne({ _id: req.params.id}, req.body);
		console.log(req.body);
		res.redirect("/browse/?message=Updated");
	} catch (err) {
		res.status(404).send({ message: `Unable to find game '${req.params.id}`});
	}
};

exports.createStats = async (req, res) => {
	const pipeline = [
		{
			$group: {
				_id: '',
				white_rating: { $sum: '$white_rating' },
				black_rating: { $sum: '$black_rating' },
				turns: { $sum: '$turns' } } },
		{
			$project: {
				_id: 0,
				white_rating: '$white_rating',
				black_rating: '$black_rating',
				turns: '$turns'
			}
		}
	];
	const totalGames = await Game.countDocuments({});
	const aggCursor = await Game.aggregate(pipeline);
	const percentRated = (await Game.find({ rated: "TRUE" }).count() / totalGames) * 100;

	console.log(`${aggCursor}`);

	try {
		res.render("stats.ejs", {
			aggCursor: aggCursor,
			totalGames: totalGames,
			percentRated: percentRated
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

