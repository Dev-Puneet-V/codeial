const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //this defines the object Id of the liked object
    //the likable can be a post or comment
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']//likeable belongs to Post or Comment, If I remove this then it can be any value
    }
},
     {
        timestamps: true
    }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;