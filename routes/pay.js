const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User } = db;

//https://medium.com/@bolajifemi28/how-to-add-paypal-checkout-to-your-react-app-37d44c58a896

module.exports = router;
