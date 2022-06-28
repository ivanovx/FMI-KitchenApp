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
    role: { type: String, default: "user" },
    avatar: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true},
});

const ingredientSchema = new Schema({
    name: { 
        type: String,
        required: true,
        maxlength: 25,
    }, 
    quantity: { 
        type: String,
        required: true,
        maxlength: 25,
    },
});

const stepSchema = new Schema({
    description: { 
        type: String,
        required: true,
        maxlength: 1024 
    },
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
    tags: [{ type: String }],
    steps: [stepSchema],
    ingredients: [ingredientSchema],
    _user : { type: Schema.ObjectId, ref: "User" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
    body: { 
        type: String, 
        required: true,
        maxlength: 256,
    },
    _user: { 
        type: Schema.ObjectId,
        ref: "User",
    },
    _recipe: { 
        type: Schema.ObjectId,
        ref: "Recipe"
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

module.exports = {
    userSchema,
    recipeSchema,
    commentSchema,
};