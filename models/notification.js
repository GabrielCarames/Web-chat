const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Notification = new Schema({
    notifications: {
        notificationType: {
            type: String
        },
        from: {
            type: Number
        }
    }
})

module.exports = model("Notification", Notification)