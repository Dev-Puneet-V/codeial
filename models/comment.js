const mongoose = require('mongoose');

const commentSection = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSection);
module.exports = Comment;