const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authenticating the user 
passport.use(new LocalStrategy({
        usernameField: 'email' 
    },
    //here 'done' is function which is reporting back to passport.js
    //whenever passport is called function(email, passwords, done) is automatically called
    function(email, password, done){
        //find a user and establich the idenity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){//user.verifyPassword(password)
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));
//uppper autication function will send done to serialize

// serialize user function and deserialize user function

//serialize the user to decide which key is to be kept in the cookies 
passport.serializeUser(function(user, done){
    done(null, user.id);//encrypts automatically using express-layout
});

//deserializing the user from the key in the cookies, when browser makes a request then we deserialize
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
           console.log('Error in finding user --> Passport');
           return done(err);          
        }
        return done(null, user);
    });
});


module.exports = passport;