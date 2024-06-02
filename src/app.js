require('dotenv/config');
const express = require("express");
const session = require('express-session');
const app = express();

const { connectToDb } = require("./db/connection");
const config = require('./config/dev');
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const profilesRoutes = require("./routes/profiles");

//Middlewares
app.use(express.json());
app.use(session({
	secret: config.session.key,
	resave: false,
	saveUninitialized: true
}))

//Routes
app.use("/user", userRoutes);
app.use('/profile', profileRoutes);
app.use('/profiles', profilesRoutes);

connectToDb(() => {
	app.listen(3000, () => {
		console.log("App is running on port 3000.");
	});
});
