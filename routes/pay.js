const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const checkJwt = require("../authO").checkJwt;
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Payment } = db;

// payerId: DataTypes.STRING,
// userId: DataTypes.INTEGER,
// emailAddress: DataTypes.STRING,
// amount: DataTypes.STRING,
// currentcyCode: DataTypes.STRING,
// payerName: DataTypes.STRING,

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
		// const userId = req.user.id;
		const payment = await Payment.create({
			payerId,
			userId,
			emailAddress,
			amount,
			currentcyCode,
			payerName,
		});

		res.status(201).json({ payment });
	})
);

module.exports = router;
