const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id//this req.user._id is got through passpost authentication where .user is alloted
        });
        console.log("Populating....");
        
        // TO DO, Populate user of Post  
        await Post.find({})
            .populate('user').then(check());
        function check() {
            //ajax request to check whether request is ajax or not
            if (req.xhr) {
                console.log(post);
                // await console.log(post);
                return res.status(200).json({//return some json, we return json with status with a success(for ajax) response 
                    data: {
                        post: post
                    },
                    message: 'Post created'
                });
            }
        } 
        req.flash('success','Post Created!!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Unable to Post');
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted Successfully"
                });
            }
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error', 'Post and associated comments deleted');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}