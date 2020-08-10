const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');//used for generating random password
const User = require('../models/user');

//tell passport to use a new STrategy for google login
passport.use(new googleStrategy({
        clientID: '1016752488714-06o28abvpi1anfftg71ilkek4fmabtlf.apps.googleusercontent.com',
        clientSecret: 'jVOGcDgyUF9q59PxiQBIsj6H',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },

    //for ex accessToken expires then refreshToken generates new Token, profile will contain some sort of users info, here we are using emails[0] because user can have many email address
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy-passport', err); return;}

            console.log(profile);
            //find the user
            if(user){
                return done(null, user);
            }else{
                //if user does not exist then create one
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                   if(err){console.log('error in creating user google strategy-passport', err); return;} 
                    return done(null, user);
                })
            }
        })
    }
));