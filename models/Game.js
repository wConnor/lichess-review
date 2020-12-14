const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema(
	{
		id: String,
		rated: String,
		created_at: String,
		last_move_at: String,
		turns: String,
		victory_status: String,
		winner: String,
		increment_code: String,
		white_id: String,
		white_rating: String,
		black_id: String,
		black_rating: String,
		moves: String,
		opening_eco: String,
		opening_name: String,
		opening_ply: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
