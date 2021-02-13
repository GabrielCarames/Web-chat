const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.model('Userxd').schema,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)