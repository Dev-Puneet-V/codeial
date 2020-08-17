const mongoose = require('mongoose');

const broadcastChat = new mongoose.Schema({
    message: String,
    user: String
}, {
    timestamps: true
});

const RChat = mongoose.model('RChat', broadcastChat);
module.exports = RChat;