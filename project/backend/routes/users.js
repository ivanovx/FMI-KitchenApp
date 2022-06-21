const express = require("express");
const { User } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
    res.status(200).json(req.user);
});

router.get("/all", async (req, res) => {
    const users = await User.find({ isActive: true}).exec();

    res.status(200).json(users);
});

router.post("/update/:id", (req, res) => {

});

module.exports = router;