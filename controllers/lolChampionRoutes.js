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
router.get("/", async (req, res) => {
    const allLolChampions = await LolChampion.find({ username: req.session.username });
    res.render("lolChampions/index.ejs", {lolChampions: allLolChampions})
})

// new 
router.get("/new", (req, res) => {
    res.render("lolChampions/new.ejs")
})

// delete
router.delete("/:id", async (req, res) => {
    await LolChampion.findByIdAndDelete(req.params.id)
    res.redirect("/lolchampions")
})
// update
router.put("/:id", async (req, res) => {
    if (req.body.readyToBattle === "on") {
        req.body.readyToBattle = true;
    } else {
        req.body.readyToBattle = false;
    }
    await LolChampion.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/lolchampions");
})

// create 
router.post("/", async (req, res) => {
    if (req.body.readyToBattle === "on" ) {
        req.body.readyToBattle = true;
    } else {
        req.body.readyToBattle = false;
    }

    req.body.username = req.session.username;

    await LolChampion.create(req.body);
    res.redirect("/lolchampions");
})
// edit
router.get("/:id/edit", async (req, res) => {
    const lolChampion = await LolChampion.findById(req.params.id)
    res.render("lolChampions/edit.ejs", { lolChampion })
})

// show
router.get("/:id", async (req, res) => {
    const foundLolChampion = await LolChampion.findById(req.params.id)
    res.render("lolChampions/show.ejs", { lolChampion: foundLolChampion })
})

module.exports = router;