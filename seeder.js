require("dotenv").config();
const fs = require("fs");
const fastcsv = require("fast-csv");
const mongodb = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const loading = require("loading-cli");

const { PORT, MONGODB_URI } = process.env;

const importMessage = loading("Importing game.csv into MongoDB.");

let stream = fs.createReadStream("games.csv");
let csvData = [];
let csvStream = fastcsv
	.parse()
	.on("data", function(data) {
		csvData.push({
			id: data[0],
			rated: data[1],
			created_at: data[2],
			last_move_at: data[3],
			turns: data[4],
			victory_status: data[5],
			winner: data[6],
			increment_code: data[7],
			white_id: data[8],
			white_rating: data[9],
			black_id: data[10],
			black_rating: data[11],
			moves: data[12],
			opening_eco: data[13],
			opening_name: data[14],
			opening_ply: data[15]
		});
	})
	.on("end", async function()	 {
		csvData.shift();

		mongodb.connect(MONGODB_URI, {useUnifiedTopology: true}, (err, client) => {
			if (err) {
				throw err;
				importMessage.fail("Failed to connect to MongoDB. Make sure the MongoDB service is running.");
			} else {
				console.log("Connected to ", MONGODB_URI);
				importMessage.start();
			}
			client
				.db("lichess-review")
				.collection("category")
				.insertMany(csvData, (err, res) => {
					if (err) throw err;		
					client.close();
					importMessage.succeed(`Successfully imported ${res.insertedCount} sets of data.`);
				});
		});
	});

stream.pipe(csvStream);
