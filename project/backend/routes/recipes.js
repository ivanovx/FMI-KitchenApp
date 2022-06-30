const express = require("express");
const { Recipe, Comment } = require("../db/models");
const { authenticate } = require("../utils");

const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate("_user", ["username", "avatar"]).sort({ createdOn: -1 });

        res.status(200).json(recipes);
    } catch(err) {
        res.status(500).json(err);
    }
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
        const recipeComments = await Comment.deleteMany({ _recipe: recipe._id});

        res.json(recipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

// todo
router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    //const _id = mongoose.Types.ObjectId(id);
    /*const tags = req.body.tags.split(",");

    const {
        title, 
        description,
        cookingTime,
        level,
        ingredients,
        steps,
    } = req.body; */

    //try {
      /*  const recipe = await Recipe.findByIdAndUpdate(id, {
            title: "updated title"
        });*/

     //   const recipe = await Recipe.findByIdAndUpdate(_id, { title: "new title"}, { new: true });

     //   res.json(recipe)
   // } catch(err) {
    //    res.status(500).json(err);
   // }

   res.send(id);
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