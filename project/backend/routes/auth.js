const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { JWT_SECRET } = require("../utils");

const router = express.Router();

router.post("/signin", async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    const user = await User.findOne({ username });

    if(!user) {
        return res.status(401).send(`Username or password is incorrect`);
    }

    const passIsValid = await bcrypt.compare(password, user.password);

    if (!passIsValid) {
        return  res.status(401).send(`Username or password is incorrect`);
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
        token,
        id: user._id,
        avatar: user.avatar,
        username: user.username,
    });
});

router.post("/signup", async (req, res) => {
    const {
        name,
        email,
        username,
        avatar,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({ 
        name, 
        email, 
        username, 
        password, 
        avatar,
    });

    try {
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;