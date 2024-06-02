const { userValidator } = require("../middlewares/validator");
const config = require("../config/dev");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/login", userValidator, async (req, res, next) => {
	const { email, password } = req.body;
	const validationErrors = req.validationErrors;

	if (Object.keys(validationErrors).length) {
		return res.status(403).json(validationErrors);
	}

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		const comparePassword = await bcrypt.compare(password, user.dataValues.password);

		if (!comparePassword) {
			return res.status(401).json({ message: "Email or password is incorrect!" });
		}

		const token = jwt.sign({ id: user.dataValues.id, firstname: user.dataValues.firstname, email: email }, config.jwt.key, {
			expiresIn: "15m",
		});

		req.session.token = token;

		res.status(201).json({ message: `You are logged in!` });
	} catch (err) {
		console.log(err);
	}
});

router.post("/register", userValidator, async (req, res, next) => {
	const { firstname, email, password } = req.body;
	const validationErrors = req.validationErrors;

	if (Object.keys(validationErrors).length) {
		return res.status(403).json(validationErrors);
	}

	try {
		const existingUser = await User.findOne({ where: { email: email } });

		if (existingUser) {
			return res.status(403).json({ message: "User already exists!" });
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ firstname, email, password: hashPassword });

		const token = jwt.sign({ id: user.dataValues.id, firstname: firstname, email: email }, config.jwt.key, {
			expiresIn: "15m",
		});

		req.session.token = token;

		res.status(201).json({ message: `User with an email: ${email} has been created!` });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
