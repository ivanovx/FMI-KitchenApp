const { Schema } = require("mongoose");

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        maxlength: 20,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 20,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true,
        maxlength: 10,
    },
    password: { 
        type: String, 
        required: true
    },
    role: { type: String },
    avatar: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true},
});

const productSchema = new Schema({
    name: { type: String }, 
    amount: { type: String },
});

const stepSchema = new Schema({
    description: { type: String },
    result: { type: String },
});

const recipeSchema = new Schema({
    title: {
        type: String, 
        required: true,
        maxlength: 50,
    },
    result: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true,
        maxlength: 512,
    },
    cookingTime: { 
        type: Number, 
        required: true
    },
    level: { 
        type: String, 
        required: true
    },
    products: [productSchema],
    steps: [stepSchema],
    _user : { type: Schema.ObjectId, ref: "User" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

// Todo
// Here
const commentSchema = new Schema({
    body: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true },
    recipeId: { type: Schema.ObjectId, required: true },
    createdOn: { type: Date, default: Date.now },
});

module.exports = {
    userSchema,
    recipeSchema,
    commentSchema,
};