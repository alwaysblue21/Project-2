const mongoose = require("./connection");

const lolChampionSchema = new mongoose.Schema({
    championName: String,
    level: Number,
    role: String,
    readyToBattle: Boolean
});

const LolChampion = mongoose.model("lolchampion", lolChampionSchema);

module.exports = LolChampion;