const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", () => {
    res.render("user/signup.ejs");
});

router.post("/signup", () => {
    res.send("signup");
});

router.get("/login", () => {
    res.render("user/login.ejs");
});

router.post("/login", () => {
    res.send("login");
});
