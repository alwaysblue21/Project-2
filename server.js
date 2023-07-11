// Import our dependencies
require('dotenv').config(); // bring in our .env vars
const express = require('express'); // web framework for node
const morgan = require('morgan'); // logger for node
const methodOverride = require('method-override'); // allows us to use PUT and DELETE methods

const userRouter = require("./controllers/user");

// const LolChampion = require("./models/lolchampion");
const lolChampionRouter = require("./controllers/lolChampionRoutes")

// express application
const app = express();

// middleware
app.use(morgan('dev')); // logging
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT
app.use(express.static('public')); // serve static files from public folder
app.use(express.urlencoded({ extended: false })); // whenever we send a form we need urlencoded
app.use(lolChampionRouter);
app.use(express.json());
app.use("/user", userRouter);
// Routes

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     });

// // index
// app.get("/lolchampions", async (req, res) => {
//     const allLolChampions = await LolChampion.find({});
//     res.render("index.ejs", {lolChampions: allLolChampions})
// })

// // new 
// app.get("/lolchampions/new", (req, res) => {
//     res.render("new.ejs")
// })

// // delete
// app.delete("/lolchampions/:id", async (req, res) => {
//     await LolChampion.findByIdAndDelete(req.params.id)
//     res.redirect("/lolchampions")
// })
// // update
// app.put("/lolchampions/:id", async (req, res) => {
//     if (req.body.readyToBattle === "on") {
//         req.body.readyToBattle = true;
//     } else {
//         req.body.readyToBattle = false;
//     }
//     await LolChampion.findByIdAndUpdate(req.params.id, req.body);
//     res.redirect("/lolchampions");
// })

// // create 
// app.post("/lolchampions", async (req, res) => {
//     if (req.body.readyToBattle === "on" ) {
//         req.body.readyToBattle = true;
//     } else {
//         req.body.readyToBattle = false;
//     }
//     await LolChampion.create(req.body)
//     res.redirect("/lolchampions")
// })
// // edit
// app.get("/lolchampions/:id/edit", async (req, res) => {
//     const lolChampion = await LolChampion.findById(req.params.id)
//     res.render("edit.ejs", { lolChampion })
// })

// // show
// app.get("/lolchampions/:id", async (req, res) => {
//     const foundLolChampion = await LolChampion.findById(req.params.id)
//     res.render("show.ejs", { lolChampion: foundLolChampion })
// })



// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })