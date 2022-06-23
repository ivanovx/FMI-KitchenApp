const express = require("express");
const { Recipe } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    const recipes = await Recipe.find({});

    res.status(200).json(recipes);
});

router.post("/create", authenticate, async (req, res) => {
    const user = req.user;
    const {
        title, 
        result,
        description,
        cookingTime,
        difficulty,
        products,
        steps,
    } = req.body;

    const recipe = new Recipe({
        title,
        result,
        description,
        cookingTime,
        difficulty,
        products,
        steps,
        userId: user.id
    });

    try {
        await recipe.save();
    } catch(err) {
        res.status(500).json(err);
    }

    res.status(201).json(recipe);
});

module.exports = router;