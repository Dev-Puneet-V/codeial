//in this controller is a set of different actions
const Posts = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);//changing cookie from server side
    Posts.find().populate('user').populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    }).exec(function(err, post){
        User.find({}, function(err, users){
            res.render('home',{
                title: 'Home',
                posts: post,
                all_users: users
            }); 
        });
    });
}

//module.exports.actionName = function(req, res){}
