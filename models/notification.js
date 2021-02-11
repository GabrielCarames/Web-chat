const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Notification = new Schema({
    notificationType: {
        type: String
    },
    from: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = model("Notification", Notification)