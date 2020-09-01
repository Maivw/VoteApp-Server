const express = require("express");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const { requireAuth } = require("../auth");
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Form } = db;

router.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const {
			userId,
			officeTitle,
			candidatename,
			disctrict,
			address,
			occupation,
		} = req.body;
		// const userId = req.user.id;
		console.log("llllll", officeTitle);
		const form = await Form.create({
			userId,
			officeTitle: officeTitle,
			candidatename,
			disctrict,
			address,
			occupation,
		});
		res.status(201).json({ form });
	})
);

module.exports = router;

// check("candidatename")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a username"),
// 	check("officeTitle")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide the office Title"),
// 	check("disctrict")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide disctrict"),
// 	check("address")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a value for address"),
// 	check("occupation")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Please provide a value for occupation"),
