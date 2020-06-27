const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //checking whether the postId Exist or not
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function(err, comment){
                if(err){console.log('Error, unable to create error'); return res.redirect('/');}
                post.comment.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}