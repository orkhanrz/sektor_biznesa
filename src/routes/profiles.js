const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res, next) => {
	const page = parseInt(req.query.page) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const users = await User.findAll({ limit, offset, order: [["createdAt", "DESC"]] });

		res.status(200).json(users);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
