const mongoose = require("mongoose");
const { 
    userSchema, 
    recipeSchema, 
    commentSchema,
} = require("./schemas");

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
    User,
    Recipe,
    Comment,
};