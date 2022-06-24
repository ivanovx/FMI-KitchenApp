const express = require("express");
const { authenticate } = require("../utils");
const { User, Recipe } = require("../models");

const router = express.Router();

router.get("/me", authenticate, async (req, res) => {
    const { id } = req.user;
    
    try {
        const user = await User.findById(id);

        if (!user) {
            res.status(404).send(`User with ${id} not found`);
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/all", async (req, res) => {
    const users = await User.find({ isActive: true });

    res.status(200).json(users);
});

router.get("/:id/recipes", authenticate, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send(`User with ${userId} not found`);
        }

        const recipes = await Recipe.where({ userId });

        if(!recipes) {
            return res.status(404).send(`User with ${userId} don't have recipes`);
        }

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id/comments", authenticate, async (req, res) => {

});

router.post("/update/:id", (req, res) => {

});

module.exports = router;