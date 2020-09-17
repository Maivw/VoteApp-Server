const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const checkJwt = require("../authO").checkJwt;
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Payment } = db;

// const paymentNotFoundError = (userId) => {
// 	const err = Error("Unauthorized");
// 	err.errors = [`Payment with userId of ${userId} could not be found.`];
// 	err.title = "You need to make a payment first";
// 	err.status = 401;
// 	return err;
// };

const userNotFound = (userId) => {
	const err = new Error("User not found");
	err.errors = [`User with id: ${userId} could not be found.`];
	err.title = "User not found.";
	err.status = 404;
	return err;
};

router.post(
	"/",
	asyncHandler(async (req, res, next) => {
		const {
			payerId,
			userId,
			emailAddress,
			amount,
			currentcyCode,
			payerName,
		} = req.body;
		const payment = await Payment.create({
			payerId,
			userId,
			emailAddress,
			amount,
			currentcyCode,
			payerName,
			alreadyPaid: true,
		});

		const user = await User.findOne({
			where: {
				id: userId,
			},
		});

		if (user) {
			await user.update({ alreadyPaid: true });
		} else {
			next(userNotFound(userId));
		}
		res.status(201).json({ payment, message: "Update successfully" });
	})
);

router.get(
	"/:payerId",
	asyncHandler(async (req, res, next) => {
		const payerId = req.params.payerId;
		console.log("789899", payerId);
		const payment = await Payment.findOne({
			where: {
				payerId: payerId,
			},
		});
		if (payment) {
			res.json({ payment });
		} else {
			// next(paymentNotFoundError(userId));
			res.send("failed");
		}
	})
);

module.exports = router;
