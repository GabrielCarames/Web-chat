const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)