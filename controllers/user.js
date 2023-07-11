const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();


// signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    try {
        await User.create(req.body);
    res.redirect("/user/login");
    } catch {
        res.send("there was an error")
    }
});


// login
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        res.send("user does not exist")
    } else {
        const passmatches = bcrypt.compareSync(req.body.password, user.password)
        if (passmatches) {
            req.session.username = req.body.username;
            req.session.loggedIn = true;
            res.redirect("/lolchampions");
        } else {
            res.send("wrong password")
        }
    }
});

//log out
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        res.redirect("/");
    })
})

module.exports = router;