const express = require("express");
const { User } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.post("/create", (req, res) => {
    res.status(200).json(req.body);
});

module.exports = router;