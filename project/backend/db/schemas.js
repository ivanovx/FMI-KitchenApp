const { Schema } = require("mongoose");

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        maxlength: 50,
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
        maxlength: 20,
    },
    password: { 
        type: String, 
        required: true
    },
    role: { type: String, default: "user" },
    avatar: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    _recipes: [{ type: Schema.ObjectId, ref: "Recipe" }],
    _comments: [{ type: Schema.ObjectId, ref: "Comment" }]
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
    steps: [{
        description: { 
            type: String,
            required: true,
            maxlength: 1024
        },
    }],
    ingredients: [{
        name: { 
            type: String,
            required: true,
            maxlength: 30,
        }, 
        quantity: { 
            type: String,
            required: true,
            maxlength: 30,
        },
    }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    _user : { type: Schema.ObjectId, ref: "User" },
});

const commentSchema = new Schema({
    body: { 
        type: String, 
        required: true,
        maxlength: 256,
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    _user: { type: Schema.ObjectId, ref: "User" },
    _recipe: { type: Schema.ObjectId, ref: "Recipe" },
});

module.exports = {
    userSchema,
    recipeSchema,
    commentSchema,
};