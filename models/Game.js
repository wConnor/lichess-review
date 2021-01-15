const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema(
	{
		match_id: String,
		rated: String,
		created_at: String,
		last_move_at: String,
		turns: Number,
		victory_status: String,
		winner: String,
		increment_code: String,
		white_id: String,
		white_rating: Number,
		black_id: String,
		black_rating: Number,
		moves: String,
		opening_eco: String,
		opening_name: String,
		opening_ply: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
