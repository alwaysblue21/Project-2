const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", (req, res) => {
    res.send("signup");
});

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", (req, res) => {
    res.send("login");
});

module.exports = router;