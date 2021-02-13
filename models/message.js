const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Message", Message)