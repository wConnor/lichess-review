const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema(
	{
		match_id: String,
		rated: String,
		created_at: String,
		last_move_at: String,
		turns: {type: Number, required: [true, "Number of turns is required."]},
		victory_status: String,
		winner: String,
		increment_code: String,
		white_id: {type: String, required: [true, "White ID is required."]},
		white_rating: {type: Number, required: [true, "White Rating is required."]},
		black_id: {type: String, required: [true, "Black ID is required."]},
		black_rating: {type: Number, required: [true, "Black Rating is required."]},
		moves: String,
		opening_eco: String,
		opening_name: String,
		opening_ply: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
