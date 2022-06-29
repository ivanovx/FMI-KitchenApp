const express = require("express");
const { Recipe, Comment } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    const recipes = await Recipe.find({}).populate("_user", ["username", "avatar"]).sort({ createdOn: -1 });

    res.status(200).json(recipes);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id).populate("_user", ["username", "avatar"]);

        if(!recipe) {
            return res.status(404).send(`Recipe with ${id} not found`);
        }

        res.status(200).json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByIdAndDelete(id);

        console.log(recipe);

        const recipeComments = await Comment.deleteMany({ _recipe: recipe._id});

        console.log(recipeComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", authenticate, async (req, res) => {
    const recipeId = req.params.id;
    const tags = req.body.tags.split(",");

    const {
        title, 
        description,
        cookingTime,
        level,
        ingredients,
        steps,
    } = req.body;

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, {
            title,
            description,
            cookingTime,
            level,
            ingredients,
            steps,
            tags,
            updatedOn: Date.now(),
        });

        res.status(200).json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post("/create", authenticate, async (req, res) => {
    const userId = req.user.id;
    const tags = req.body.tags.split(",");

    const {
        title, 
        result,
        description,
        cookingTime,
        level,
        ingredients,
        steps,
    } = req.body;

    const recipe = new Recipe({
        title,
        result,
        description,
        cookingTime,
        level,
        ingredients,
        steps,
        tags,
        _user: userId
    });

    try {
        await recipe.save();
        
        res.status(201).json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;