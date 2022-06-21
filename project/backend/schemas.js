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

module.exports = {
    userSchema,
};