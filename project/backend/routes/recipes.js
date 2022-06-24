const express = require("express");
const { Recipe } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    const recipes = await Recipe.find({}).sort({ createdOn: -1 })

    res.status(200).json(recipes);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id);

        if(!recipe) {
            return res.status(404).send(`Recipe with ${id} not found`);
        }

        res.status(200).json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
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