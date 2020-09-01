const express = require("express");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const { requireAuth } = require("../auth");
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Form } = db;

const formNotFoundError = (id) => {
	const err = Error("Unauthorized");
	err.errors = [`Form with id of ${id} could not be found.`];
	err.title = "You are not able to get the form.";
	err.status = 401;
	return err;
};

router.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const {
			officeTitle,
			candidatename,
			disctrict,
			address,
			occupation,
		} = req.body;
		const userId = req.user.id;
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
router.get(
	"/:formId",
	asyncHandler(async (req, res) => {
		const formId = parseInt(req.params.formId, 10);
		const form = await Form.findByPk(formId, {});
		if (form) {
			res.json({ form });
		} else {
			next(postNotFoundError(formId));
		}
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
