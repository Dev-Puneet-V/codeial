const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentPostEmailWorker = require('../workers/comment_post_email_worker');
module.exports.create = async function(req, res){
    //checking whether the postId Exist or not
    try{
        let post = await Post.findById(req.body.post);
        await post.populate('user','name email').execPopulate((err) => {
            if(err){console.log('Some error in populating post', err); return;}
        });

        if(post){
            let comment = await Comment.create({
                content: req.body.content.trim(),
                user: req.user._id,
                post: req.body.post
            });
            post.comment.push(comment);
            post.save();
            console.log('post1', post, 'post2');
            await comment.populate('user', 'name email').execPopulate();
            // console.log(comment);
            // commentMailer.newComment(comment);
            //Job queue using kue, this will call kue.create and create queue, if the queue is not created then it will create it othewise just work on it
            //This worker is for sending mail to the one who commented
            let job_c = queue.create('emails', comment).save(function(err){
                if(err){console.log('error in creating a queue', err); return;}
                console.log('job enqued', job_c.id);
            });
            //this worker for handling the queue for sending mails if someone comment on your post
            let job_c_p = queue.create('emails_post_comment', {post: post, comment: comment}).save(function(err){
                if(err){console.log('error in creating a queue', err); return;}
                console.log('job enqued', job_c_p.id);
            });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"posted comment"
                });
            }
            req.flash('success', 'Comment Added');
            res.redirect('/');
        }
    }catch(err){
        console.log(err);
        req.flash('error', 'Unable to comment');
        console.log('Unable to create comment');
        return res.redirect('/');
    }
}

module.exports.destroy =  function(req, res){
    let comment = Comment.findById(req.params.id, function(err, comment){
        Post.findById(comment.post, async function(err, post){//this is done to give access to the authenticated user to delete comments on their own post
            user = post.user;
            if(comment.user == req.user.id ||  user == req.user.id){
                let postId = comment.post;
                
                //remove Likes which are associated with this comment
                await Like.deleteMany({likable: comment._id, onModel: 'Comment'});

                comment.remove();

                //$pull -> https://docs.mongodb.com/manual/reference/operator/update/pull/
                Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}},function(err, post){
                    if(err){req.flash('error','Unable to delete comment'); console.log("Error in deleting comment"); res.redirect('back');}
                    if(req.xhr){
                        return res.status(200).json({
                            data: {
                                commentId: req.params.id
                            },
                            message: "Post Deleted Successfully"
                        });
                    }
                    req.flash('success', 'comment deleted');
                    return res.redirect('back');
                });
            }else{
                return res.redirect('back');
            }
        });
   });
}