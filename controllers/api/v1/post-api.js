const Post = require('../../../models/post');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user', 'name email')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    });
}