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

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        Post.findById(comment.post, function(err, post){//this is done to give access to the authenticated user to delete comments on their own post
            user = post.user;
            if(comment.user == req.user.id ||  user == req.user.id){
                let postId = comment.post;

                comment.remove();

                Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}},function(err, post){
                    if(err){console.log("Error in deleting comment");}
                    return res.redirect('back');
                });
            }else{
                return res.redirect('back');
            }
        });
    });
}