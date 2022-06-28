const express = require("express");
const { Recipe } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    const recipes = await Recipe.find({}).populate("_user", ["username", "avatar"]).sort({ createdOn: -1 });

    res.status(200).json(recipes);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id).populate('_user', ["username"]);

        if(!recipe) {
            return res.status(404).send(`Recipe with ${id} not found`);
        }

        res.status(200).json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post("/create", authenticate, async (req, res) => {
    const userId = req.user.id;

    const {
        title, 
        result,
        description,
        cookingTime,
        level,
        products,
        steps,
    } = req.body;   

    const recipe = new Recipe({
        title,
        result,
        description,
        cookingTime,
        level,
        products,
        steps,
        _user: userId
    });

    try {
        await recipe.save();
    } catch(err) {
        res.status(500).json(err);
    }

    res.status(201).json(recipe);
});

module.exports = router;