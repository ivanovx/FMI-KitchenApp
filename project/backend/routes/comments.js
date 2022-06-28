const express = require("express");
const { User, Recipe, Comment } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

/*router.get("/:recipeId", async (req, res) => {
    const { recipeId } = req.params;

    const comments = await Recipe.findById(recipeId).populate("_comments")

    res.status(200).json(comments);
});*/

router.post("/:recipeId", authenticate, async (req, res) => {
    const userId = req.user.id;
    const { body } = req.body;
    const { recipeId } = req.params;

    const comment = new Comment({
        body,
        _user: userId,
        _recipe: recipeId,
    });

    await comment.save();

    res.status(201).json(comment);
});

module.exports = router;