const mongoose = require('mongoose');
const notification = require('./notification');
require('./notification');
const notificationSchema = mongoose.model('Notification').schema
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
    friends: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
    notifications: {
        type: [notificationSchema],
        required: false
    },
    createdAt: {
         type: Date, 
         default: Date.now
    }
})

module.exports = model("Userxd", User)