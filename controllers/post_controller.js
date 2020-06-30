const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id//this req.user._id is got through passpost authentication where .user is alloted
        });
        req.flash('success', 'Post added')
        return res.redirect('back');
    }catch(err){
        req.flash('error', 'Unable to Post');
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error', 'Post and associated comments deleted');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}