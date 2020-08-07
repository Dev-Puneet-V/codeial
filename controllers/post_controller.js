const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id//this req.user._id is got through passpost authentication where .user is alloted
        });
        if (req.xhr) {
            // Call the `populate()` method on a document to populate a path.
            // Need to call `execPopulate()` to actually execute the `populate()
            await post.populate("user","name").execPopulate();
            console.log(post);
            // await console.log(post);
            return res.status(200).json({//return some json, we return json with status with a success(for ajax) response 
                data: {
                    post: post
                },
                message: 'Post created'
            });
        }
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