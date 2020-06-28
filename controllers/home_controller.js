//in this controller is a set of different actions
const Posts = require('../models/post')
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);//changing cookie from server side
    Posts.find().populate('user').populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    }).exec(function(err, post){
        res.render('home',{
            title: 'Home',
            posts: post
        });
    });
}

//module.exports.actionName = function(req, res){}
