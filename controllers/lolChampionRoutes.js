const express = require("express");
const LolChampion = require("../models/lolchampion")

const router = express.Router();

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login")
    }
})

// router.get('/', (req, res) => {
//     res.send('Hello World!');
//     });

// index
router.get("/lolchampions", async (req, res) => {
    const allLolChampions = await LolChampion.find({});
    res.render("lolChampions/index.ejs", {lolChampions: allLolChampions})
})

// new 
router.get("/lolchampions/new", (req, res) => {
    res.render("lolChampions/new.ejs")
})

// delete
router.delete("/lolchampions/:id", async (req, res) => {
    await LolChampion.findByIdAndDelete(req.params.id)
    res.redirect("/lolchampions")
})
// update
router.put("/lolchampions/:id", async (req, res) => {
    if (req.body.readyToBattle === "on") {
        req.body.readyToBattle = true;
    } else {
        req.body.readyToBattle = false;
    }
    await LolChampion.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/lolchampions");
})

// create 
router.post("/lolchampions", async (req, res) => {
    if (req.body.readyToBattle === "on" ) {
        req.body.readyToBattle = true;
    } else {
        req.body.readyToBattle = false;
    }
    await LolChampion.create(req.body)
    res.redirect("/lolchampions")
})
// edit
router.get("/lolchampions/:id/edit", async (req, res) => {
    const lolChampion = await LolChampion.findById(req.params.id)
    res.render("lolChampions/edit.ejs", { lolChampion })
})

// show
router.get("/lolchampions/:id", async (req, res) => {
    const foundLolChampion = await LolChampion.findById(req.params.id)
    res.render("lolChampions/show.ejs", { lolChampion: foundLolChampion })
})

module.exports = router;