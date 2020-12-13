const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema(
	{
		rated: Boolean,
		started: Number,
		ended: Number,
		moves: Number,
		victoryStatus: String,
		winner: String,
		gameType: String,
		whiteUser: String,
		whiteRating: Number,
		blackUser: String,
		blackRating: Number,
		moves: String,
		openingEco: String,
		openingName: String,
		openingPhaseMoves: Number
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
