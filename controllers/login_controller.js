const db = require('../config/mongoose');
const newLogin = require('../models/user');


module.exports.login = function(req, res){
    return res.render('login', {
        title: 'Login Page'
    })
}

module.exports.newLogin = function(req, res){
    
    let find = newLogin.find({
        email: req.body.email
    }, function(err, docs){
        if(err){
            console.log("Unable to retrieve data");
            return;
        }
        if(docs.length > 0){
            if(req.body.password === docs[0].password){
                return res.render('home', {
                    title: 'Logged In'
                })
            }else{
                return res.redirect('back');
            }
        }
    });
}