const router = require("express").Router();
const auth = require("../middlewares/auth");
const { userValidator } = require("../middlewares/validator");
const upload = require("../services/fileUpload");
const User = require("../models/User");

router.get("/", auth, async (req, res, next) => {
	try {
		const users = await User.findAll();

		res.status(200).json(users);
	} catch (err) {
		console.log(err);
	}
});

router.get("/:id", auth, async (req, res, next) => {
	const id = req.params.id;

	try {
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		const { password, ...userData } = user.dataValues;

		res.status(200).json(userData);
	} catch (err) {
		console.log(err);
	}
});

router.put("/:id", auth, upload.single("photo"), userValidator, async (req, res, next) => {
	const id = req.params.id;
	const { firstname, lastname, email, gender } = req.body;
	const photo = req.file ? "/uploads/" + req.file.filename : null;
	const validationErrors = req.validationErrors;

	if (Object.keys(validationErrors).length) {
		return res.status(403).json(validationErrors);
	}

	try {
		await User.update(
			{
				firstname,
				lastname,
				email,
				gender,
				photo,
			},
			{
				where: {
					id,
				},
			}
		);

		const { dataValues: updatedUser } = await User.findByPk(id);
		const { password, ...updatedUserData } = updatedUser;

		res.send({ message: "User has been updated", updatedUserData });
	} catch (err) {
		res.send(err.message);
	}
});

module.exports = router;
