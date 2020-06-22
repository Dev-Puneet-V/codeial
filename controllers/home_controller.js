//in this controller is a set of different actions
module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 25);//changing cookie from server side
    return res.render('home',{
        title: "Home"
    });
}

//module.exports.actionName = function(req, res){}
