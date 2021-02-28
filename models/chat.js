const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Chat = new Schema({
    name: {
        type: String
    },
    chatType: {
        type: String,
        required: true
    },
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