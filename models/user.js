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
    avatar: {
        type: String,
        required: false,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fasia.ifoam.bio%2Fwp-content%2Fuploads%2F2018%2F12%2Favatar__181424.png&f=1&nofb=1',
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
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification',
        }
    ],
    createdAt: {
         type: Date, 
         default: Date.now
    }
})

module.exports = model("User", User)