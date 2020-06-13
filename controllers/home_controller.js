//in this controller is a set of different actions
module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    });
}

//module.exports.actionName = function(req, res){}
