const mongoose = require("mongoose");
const { userSchema, recipeSchema } = require("./schemas");

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {
    User,
    Recipe,
};