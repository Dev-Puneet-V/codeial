const db = require('../config/mongoose');
const newUser = require('../models/user');

module.exports.register = function(req, res){
    return res.render('register', {
        title: 'Registration Page'
    })
}

module.exports.newUser = function(req, res){
    newUser.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    return res.render('home', {
        title: 'Home Page'
    });
}