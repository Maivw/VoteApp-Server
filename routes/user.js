const express = require("express");
const bcrypt = require("bcryptjs");
const checkJwt = require("../authO").checkJwt;
const { check } = require("express-validator");
const {
	asyncHandler,
	handleValidationErrors,
	validatePassword,
} = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { User, Form, Payment } = db;
const router = express.Router();
const userNotFound = (userId) => {
	const err = new Error("User not found");
	err.errors = [`User with id: ${userId} could not be found.`];
	err.title = "User not found.";
	err.status = 404;
	return err;
};

const validateLoginInfo = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

router.patch(
	"/",
	checkJwt,
	asyncHandler(async (req, res) => {
		const { email, nickname, picture } = req.body;
		let user = await User.findOne({
			where: {
				email,
			},
			include: [Payment],
		});

		if (!user) {
			user = await User.create({ email, username: nickname, picture });
			res.status(201).json({
				user: {
					id: user.id,
					username: user.nickname,
					email: user.email,
					picture: user.picture,
				},
			});
		} else {
			res.status(201).json({
				user: {
					id: user.id,
					nickname: user.nickname,
					email: user.email,
					picture: user.picture,
				},
			});
		}
	})
);

// router.get(
// 	"/:id",
// 	requireAuth,
// 	asyncHandler(async (req, res) => {
// 		const userId = parseInt(req.params.id, 10);
// 		const user = await User.findByPk(userId, {
// 			attributes: {
// 				exclude: ["password"],
// 			},
// 		});
// 		res.json({ user });
// 	})
// );

// router.post(
// 	"/",
// 	check("username")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a username"),
// 	check("email")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide your email"),
// 	check("password")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a password."),
// 	check("confirmPassword")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a value for Confirm Password")
// 		.custom((value, { req }) => {
// 			if (value !== req.body.password) {
// 				throw new Error("Confirm Password does not match Password");
// 			}
// 			return true;
// 		}),
// 	asyncHandler(async (req, res, next) => {
// 		const { email, username, password } = req.body;
// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		const user = await User.create({
// 			email,
// 			username: username,
// 			password: hashedPassword,
// 		});

// 		const token = getUserToken(user);
// 		res.status(201).json({
// 			user: { id: user.id },
// 			token,
// 			name: username,
// 		});
// 	})
// );

// router.post(
// 	"/login",
// 	asyncHandler(async (req, res, next) => {
// 		const { email, password } = req.body;
// 		const user = await User.findOne({
// 			where: { email },
// 		});

// 		if (!user || !validatePassword(password, user.password)) {
// 			const err = new Error("Failed to log in.");
// 			err.errors = ["The provided credentials were invalid"];
// 			err.status = 401;
// 			err.title = "Login failed.";
// 			return next(err);
// 		}
// 		const token = getUserToken(user);
// 		res.json({
// 			token,
// 			user: { id: user.id },
// 			username: user.username,
// 		});
// 	})
// );

// router.put(
// 	"/:id",
// 	requireAuth,
// 	asyncHandler(async (req, res, next) => {
// 		const userId = parseInt(req.params.id, 10);
// 		const user = await User.findByPk(userId);
// 		if (user) {
// 			await user.update({
// 				email: req.body.email,
// 				username: req.body.username,
// 				password: req.password,
// 			});

// 			const updatedUser = await User.findByPk(userId, {
// 				attributes: { exclude: ["password"] },
// 			});
// 			res.json({ updatedUser });
// 		} else {
// 			next(userNotFound(userId));
// 		}
// 	})
// );

// router.get(
// 	"/:id/forms",
// 	asyncHandler(async (req, res) => {
// 		const userId = parseInt(req.params.id, 10);
// 		const forms = await User.findAll({
// 			where: { id: userId },
// 			order: [["createdAt", "DESC"]],
// 			include: [Form],
// 		});
// 		res.json({ forms });
// 	})
// );

module.exports = router;
