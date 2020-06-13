module.exports.posts = function(req, res){
    return res.render('post',{
        title: 'Post'
    });
}