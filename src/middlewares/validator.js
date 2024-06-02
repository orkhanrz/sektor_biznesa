const passwordHasNumber = /[0-9]/;
const passwordHasSpecialChar = /[!@#$%^&*]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;


module.exports.userValidator = (req, res, next) => {
	const errors = {};
	const { firstname, lastname, email, password, gender } = req.body;

	if (firstname != undefined && firstname.length <= 2) {
		errors.firstname = "Firstname should have at least 2 characters!";
	}

	if (lastname != undefined && lastname.length <= 2) {
		errors.lastname = "Lastname should have at least 2 characters!";
	}

	if (email != undefined && !emailRegex.test(email)) {
		errors.email = "Please provide a valid email!";
	}

	if (password != undefined && (password[0] != password[0].toUpperCase())) {
		errors.password = "Password should start with an uppercase letter!";
	}

	if (password != undefined && (!passwordHasNumber.test(password) || !passwordHasSpecialChar.test(password))) {
		errors.password = "Password should contain at least one number and one special character!";
	}

	if (password != undefined && !password.length) {
		errors.password = "Please provide a password!";
	}

	if ((gender != undefined && gender != 0 && gender != 1) || gender == '' ) {
		errors.gender = "Please provide a valid gender! (0: female, 1: male)";
	}

	req.validationErrors = errors;

	next();
};
