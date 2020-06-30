const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    //checking whether the postId Exist or not
    try{
    let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }); 
            post.comment.push(comment);
            post.save();
            req.flash('success', 'Comment Added');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error', 'Unable to comment');
        console.log('Unable to create comment');
        return res.redirect('/');
    }
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        Post.findById(comment.post, function(err, post){//this is done to give access to the authenticated user to delete comments on their own post
            user = post.user;
            if(comment.user == req.user.id ||  user == req.user.id){
                let postId = comment.post;

                comment.remove();

                //$pull -> https://docs.mongodb.com/manual/reference/operator/update/pull/
                Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}},function(err, post){
                    if(err){req.flash('error','Unable to delete comment'); console.log("Error in deleting comment"); res.redirect('back');}
                    req.flash('success', 'comment deleted');
                    return res.redirect('back');
                });
            }else{
                return res.redirect('back');
            }
        });
    });
}