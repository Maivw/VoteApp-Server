const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Payment } = db;

router.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { amount } = req.body;
		const userId = req.user.id;
		const like = await Like.findOne({
			where: {
				userId: userId,
				postId: id,
			},
		});
		if (like) {
			await like.destroy();
			res.status(201).json({ like, message: "unlike successfully" });
		} else {
			const like = await Like.create({
				userId: userId,
				postId: id,
			});
			res.status(201).json({ like });
		}
	})
);

module.exports = router;
