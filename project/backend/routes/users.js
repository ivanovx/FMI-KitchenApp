const express = require("express");
const { authenticate } = require("../utils");
const { User, Recipe, Comment } = require("../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({ isActive: true });

        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send(`User with ${id} not found`);
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    const {
        name,
        email,
        username,
    } = req.body;
    
    try {
        const user = await User.findByIdAndUpdate(id, { 
            name,
            email,
            username,
            updatedOn: Date.now(), 
        }, { new: true });

        if (!user) {
            return res.status(404).send(`User with ${id} not found`);
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id/recipes", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send(`User with ${IDBFactory} not found`);
        }

        const recipes = await Recipe.where({ _user: user._id });

        if(!recipes) {
            return res.status(404).send(`User with ${id} don't have recipes`);
        }

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send(`User with ${id} not found`);
        }

        const comments = await Comment.where({ _user: user._id }).populate("_recipe", ["title"]);

        if(!comments) {
            return res.status(404).send(`User with ${id} don't have comments`);
        }

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;