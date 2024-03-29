const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

//populating data into the api after extraction from DB
module.exports.index = async function (req, res) {

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


//Deleting Post using api
//for checking it use Postman to see its effect => http://localhost:8000/api/v1/posts/Some_present_Id and select option of DELETE
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        return res.json(200, {
            message: "Post and associated comments deleted"
        });
    }else{
        return res.json(401, {
            message : 'You cannot delete this post'
        })
    }
    }
    catch (err) {
        console.log('Error', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}