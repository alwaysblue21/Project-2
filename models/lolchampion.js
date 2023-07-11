const mongoose = require("./connection");

const lolChampionSchema = new mongoose.Schema({
    championName: { type: String, required: true },
    level: { type: Number, required: true },
    role: { type: String, required: true },
    readyToBattle: Boolean,
    username: String,
});

const LolChampion = mongoose.model("lolchampion", lolChampionSchema);

module.exports = LolChampion;