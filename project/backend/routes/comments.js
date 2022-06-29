const express = require("express");
const { User, Recipe, Comment } = require("../models");
const { authenticate } = require("../utils");

const router = express.Router();

router.get("/:recipeId", async (req, res) => {
    const recipe = req.params.recipeId;

    const comments = await Comment.find({ _recipe: recipe }).populate("_user", ["username"]);

    res.status(200).json(comments);
});

router.post("/:recipeId", authenticate, async (req, res) => {
    const userId = req.user.id;
    const { body } = req.body;
    const { recipeId } = req.params;

    try {
        const comment = new Comment({
            body,
            _user: userId,
            _recipe: recipeId,
        });
    
        await comment.save();
    
        res.status(201).json(comment);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete("/:commentId", authenticate, async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(commentId);

        console.log(comment);

        res.send(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;