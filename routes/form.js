const express = require("express");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User } = db;

module.exports = router;
