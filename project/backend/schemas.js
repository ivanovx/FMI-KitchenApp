const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    role: String,
    avatar: String,
    createdOn: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true},
});

const productSchema = new mongoose.Schema({
    name: String, 
    amount: String,
});

const stepSchema = new mongoose.Schema({
    description: String,
    result: String,
});

// Todo YouTube link
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true},
    result: { type: String, required: true},
    description: { type: String, required: true},
    cookingTime: { type: Number, required: true},
    difficulty: { type: String, required: true},
    products: [productSchema],
    steps: [stepSchema],
    userId: { type: ObjectId, required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    recipeId: { type: ObjectId, required: true },
    createdOn: { type: Date, default: Date.now },
});

module.exports = {
    userSchema,
    recipeSchema,
    commentSchema,
};