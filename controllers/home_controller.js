//in this controller is a set of different actions
const Posts = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);//changing cookie from server side
    try{
        //await is inside async, await is used so that before going forward it must complete the awaited one
        let post = await Posts.find().populate('user').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render('home',{
            title: 'Home',
            posts: post,
            all_users: users
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}

//module.exports.actionName = function(req, res){}

