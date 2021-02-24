const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Chat = new Schema({
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Chat", Chat)