const express = require("express");
const { authenticate } = require("../utils");
const { User, Recipe, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find({ isActive: true });

    res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send(`User with ${userId} not found`);
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id/recipes", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send(`User with ${userId} not found`);
        }

        const recipes = await Recipe.where({ _user: user._id });

        if(!recipes) {
            return res.status(404).send(`User with ${userId} don't have recipes`);
        }

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id/comments", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send(`User with ${userId} not found`);
        }

        const comments = await Comment.where({ _user: user._id });

        if(!comments) {
            return res.status(404).send(`User with ${userId} don't have comments`);
        }

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;