const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    //this is used for connecting with unique users with their Unique Id 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true //used for getting time at which the row is added
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;