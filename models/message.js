const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Message = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = model("Message", Message)