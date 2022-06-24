const express = require("express");
const { User, Recipe, Comment } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/:recipeId", async (req, res) => {
    const { recipeId } = req.params;

    const comments = await Comment.where({ recipeId });

    res.status(200).json(comments);
});

router.post("/:recipeId", authenticate, async (req, res) => {
    const userId = req.user.id;
    const { body } = req.body;
    const { recipeId } = req.params;

    const comment = new Comment({
        userId,
        recipeId,
        body
    });

    await comment.save();

    res.status(201).json(comment);
});

module.exports = router;