const mongoose = require('mongoose');
const { Schema } = mongoose;

const baseSchema = require('./base');

const userSchema = baseSchema.clone();

userSchema.add({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        require: false,
        unique: true,
    },
    salt: String,
});

module.exports = mongoose.model('User', userSchema);
