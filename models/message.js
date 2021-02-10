const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = model("Message", Message)