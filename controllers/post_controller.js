const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id//this req.user._id is got through passpost authentication where .user is alloted
    }, function(err, post){
        if(err){console.log('error in creating post'); return;}
        return res.redirect('back');
    });
}