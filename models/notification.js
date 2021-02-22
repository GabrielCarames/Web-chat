const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Notification = new Schema({
    notificationType: {
        type: String
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date, 
        default: Date.now
   }
})

module.exports = model("Notification", Notification)