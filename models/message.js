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
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)