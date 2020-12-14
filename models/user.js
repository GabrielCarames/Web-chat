const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = model("Userxd", User)